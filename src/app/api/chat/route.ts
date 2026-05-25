import { openai } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

// AI SDK v6. Note: the v4-era result.toDataStreamResponse() was removed —
// the v6 equivalent the useChat UI hook consumes is
// result.toUIMessageStreamResponse() (used below).
//
// Phase A: stub system prompt + cheapest viable model. The real AIHAA
// persona + sales context lands in Phase B; the UI wiring in Phase C.

export const maxDuration = 30;

// gpt-4o-mini — cheapest viable (~$0.15 / 1M input tokens). Swap the
// model id here later without touching the rest of the pipeline.
const MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT =
  "Kamu adalah chatbot AIHAA. Jawab dalam Bahasa Malaysia. " +
  "(Phase A stub — real persona lands in Phase B.)";

export async function POST(req: Request) {
  // Plain { role, content } pairs map directly onto ModelMessage[].
  // (Phase C's useChat sends UIMessage[] with parts — convert with
  // convertToModelMessages() when that lands.)
  const { messages }: { messages: ModelMessage[] } = await req.json();

  // openai() reads OPENAI_API_KEY lazily at request time, so the build
  // succeeds without the key set — it's only required to actually run.
  const result = streamText({
    model: openai(MODEL),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
