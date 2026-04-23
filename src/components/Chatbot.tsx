"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { flows, whatsappUrls, matchKeyword, type ChatMessage } from "@/lib/chatbot-flows";

let msgId = 0;
function nextId() {
  return `msg-${++msgId}`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { locale, t } = useLanguage();

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function triggerFlow(flowName: string, withDelay: boolean) {
    const flow = flows[flowName];
    if (!flow) return;

    if (withDelay) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(flow.message[locale], flow.quickReplies?.map((qr) => ({
          label: qr.label[locale],
          action: qr.action,
        })));
      }, 800);
    } else {
      addBotMessage(flow.message[locale], flow.quickReplies?.map((qr) => ({
        label: qr.label[locale],
        action: qr.action,
      })));
    }
  }

  function addBotMessage(text: string, quickReplies?: { label: string; action: string }[]) {
    setMessages((prev) => [...prev, { id: nextId(), type: "bot", text, quickReplies }]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { id: nextId(), type: "user", text }]);
  }

  function handleOpen() {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      triggerFlow("greeting", true);
    }
  }

  function handleAction(action: string) {
    // Link action — navigate and close
    if (action.startsWith("link:")) {
      const path = action.replace("link:", "");
      setIsOpen(false);
      router.push(path);
      return;
    }

    // WhatsApp actions — show redirect message (with typing delay), then open
    if (action.startsWith("whatsapp")) {
      const redirectFlow = flows.whatsapp_redirect;
      const url = whatsappUrls[action] || whatsappUrls.whatsapp;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(redirectFlow.message[locale]);
        setTimeout(() => {
          window.open(url, "_blank");
        }, 1000);
      }, 800);
      return;
    }

    // Regular flow — always with typing delay so every bot reply feels human
    triggerFlow(action, true);
  }

  function handleQuickReply(label: string, action: string) {
    addUserMessage(label);
    handleAction(action);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);
    const matched = matchKeyword(text);
    if (matched) {
      handleAction(matched);
    } else {
      triggerFlow("fallback", true);
    }
  }

  return (
    <>
      {/* Chat trigger button — above WhatsApp button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-[88px] right-4 z-50 w-14 h-14 bg-[#0D0D0D] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 border border-[rgba(218,165,32,0.3)]"
          aria-label="Open chat"
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
                <p className="text-white text-sm font-semibold">{t.chatbot_agent_header}</p>
                <p className="text-[#999] text-[11px]">{t.chatbot_reply_time}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#999] hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F8F8]">
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                {/* Message bubble */}
                <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.type === "user"
                        ? "bg-[#DAA520] text-white rounded-br-md"
                        : "bg-white text-[#333] rounded-bl-md border border-[rgba(0,0,0,0.06)]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Quick replies — only on the latest bot message to avoid stale button accumulation */}
                {msg.type === "bot" && msg.quickReplies && idx === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-1">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.action}
                        onClick={() => handleQuickReply(qr.label, qr.action)}
                        className="text-xs px-3 py-1.5 rounded-full border border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-white transition-colors"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-[rgba(0,0,0,0.06)] flex gap-1">
                  <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#999] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(0,0,0,0.06)] p-3 flex gap-2 bg-white flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={locale === "bm" ? "Taip mesej..." : "Type a message..."}
              className="flex-1 text-sm bg-[#F5F5F5] rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#333] placeholder-[#999]"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#DAA520] text-white flex items-center justify-center hover:opacity-90 transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
