"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, MessageCircle } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// AI SDK v6 chat widget. Talks to /api/chat (Phase B). The custom
// keyword-flow engine that lived here previously is gone — useChat owns
// the conversation now. Visual shell (toggle button, panel, header,
// bubbles, input) is preserved from the prior version.

const MAX_LEN = 500;

// Static transport — created once at module scope so it isn't
// re-instantiated on every render.
const transport = new DefaultChatTransport({ api: "/api/chat" });

// Safety net: the system prompt tells the model not to emit markdown,
// but if it slips (e.g. a [label](url) link after a tool call), strip
// the syntax so raw markup never shows in the bubble. Links collapse to
// their label (the green button already owns the real handoff URL).
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // [label](url) -> label
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold** -> bold
    .replace(/\*([^*\n]+)\*/g, "$1") // *italic* -> italic
    .replace(/__([^_]+)__/g, "$1"); // __bold__ -> bold
}

// Shape returned by the connectToAdmin / connectToSales tools (Phase B).
type HandoffOutput = {
  buttonLabel: string;
  waUrl: string;
  adminName?: string;
  salesName?: string;
  isOutOfCoverage?: boolean;
};

function WhatsAppHandoffButton({ output }: { output: HandoffOutput }) {
  return (
    <div className="mt-1">
      {output.isOutOfCoverage && (
        <p className="text-[11px] text-[#777] mb-1.5 leading-snug">
          Negeri ini belum sepenuhnya covered service team kami, tapi Hakiim
          boleh consult.
        </p>
      )}
      <a
        href={output.waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        <MessageCircle className="w-5 h-5" fill="white" />
        {output.buttonLabel}
      </a>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const { messages, sendMessage, status, regenerate, setMessages, stop } =
    useChat({ transport });

  const isBusy = status === "submitted" || status === "streaming";

  // Close = fresh start. Halt any in-flight stream first (so a late
  // token can't write to a closed panel), wipe history, then hide.
  // No persistence by design — privacy on shared devices + each inquiry
  // is self-contained.
  function handleClose() {
    stop();
    setMessages([]);
    setIsOpen(false);
  }

  // Auto-scroll to bottom on new message / status change.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  // Auto-focus the input when the panel opens.
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function submit() {
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Enter sends; Shift+Enter is a no-op on the single-line input.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <>
      {/* Chat trigger button — flush bottom-right. */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#0D0D0D] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 border border-[rgba(218,165,32,0.3)]"
          aria-label="Buka chatbot AIHAA Assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[60] w-[380px] max-w-[calc(100vw-32px)] h-[480px] max-h-[85vh] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-[rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="bg-[#0D0D0D] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#DAA520] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {t.chatbot_agent_header}
                </p>
                <p className="text-[#999] text-[11px]">{t.chatbot_reply_time}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-[#999] hover:text-white transition-colors p-1"
              aria-label="Tutup chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F8F8]"
          >
            {/* Welcome bubble — shown until the first message is sent. */}
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed bg-white text-[#333] border border-[rgba(0,0,0,0.06)]">
                  Hai! Saya AIHAA Assistant. Macam mana saya boleh bantu hari ni?
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#DAA520] text-white rounded-br-md"
                      : "bg-white text-[#333] rounded-bl-md border border-[rgba(0,0,0,0.06)]"
                  }`}
                >
                  {msg.parts.map((part, i) => {
                    if (part.type === "text") {
                      return <span key={i}>{stripMarkdown(part.text)}</span>;
                    }
                    // v6 tool parts: type is `tool-connectToAdmin` /
                    // `tool-connectToSales`; result lands in part.output
                    // when state === "output-available".
                    if (part.type.startsWith("tool-")) {
                      const toolPart = part as unknown as {
                        state: string;
                        output?: HandoffOutput;
                      };
                      if (
                        toolPart.state === "output-available" &&
                        toolPart.output
                      ) {
                        return (
                          <WhatsAppHandoffButton key={i} output={toolPart.output} />
                        );
                      }
                      return (
                        <span key={i} className="text-xs text-[#999] italic">
                          Menyediakan butang…
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {/* Typing indicator — only while waiting for the first token. */}
            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-[rgba(0,0,0,0.06)] flex gap-1">
                  <span
                    className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            {/* Error bubble + retry. */}
            {status === "error" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm bg-red-50 text-red-700 border border-red-200">
                  Maaf, ada masalah. Cuba lagi atau hubungi WhatsApp terus.
                  <button
                    onClick={() => regenerate()}
                    className="block mt-2 text-xs font-semibold text-red-700 underline"
                  >
                    Cuba lagi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(0,0,0,0.06)] p-3 flex gap-2 bg-white flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={MAX_LEN}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Taip mesej..."
              disabled={isBusy}
              className="flex-1 text-sm bg-[#F5F5F5] rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#333] placeholder-[#999] disabled:opacity-60"
            />
            <button
              onClick={submit}
              disabled={isBusy || !input.trim()}
              className="w-10 h-10 rounded-full bg-[#DAA520] text-white flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0 disabled:opacity-50"
              aria-label="Hantar mesej"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
