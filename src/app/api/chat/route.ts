import { openai } from "@ai-sdk/openai";
import { streamText, stepCountIs, type ModelMessage } from "ai";
import { buildSystemPrompt } from "@/lib/chatbot/system-prompt";
import { chatbotTools } from "@/lib/chatbot/tools";

// AI SDK v6 chat route. Persona + product/service knowledge come from
// buildSystemPrompt(); handoff tools come from chatbotTools.
//
// v6 notes:
// - result.toUIMessageStreamResponse() is the v6 replacement for the
//   v4 toDataStreamResponse() (which no longer exists).
// - stopWhen: stepCountIs(5) is the v6 replacement for v4 maxSteps — it
//   lets the model call a tool, receive the result, then continue the
//   reply naturally (up to 5 steps) instead of stopping after the call.

export const maxDuration = 30;

// gpt-4o-mini — cheapest viable (~$0.15 / 1M input). Swap here only.
const MODEL = "gpt-4o-mini";

export async function POST(req: Request) {
  // Plain { role, content } pairs map directly onto ModelMessage[].
  // (Phase C's useChat sends UIMessage[] with parts — convert with
  // convertToModelMessages() when that lands.)
  const { messages }: { messages: ModelMessage[] } = await req.json();

  // openai() reads OPENAI_API_KEY lazily at request time, so the build
  // succeeds without the key set — it's only needed to actually run.
  const result = streamText({
    model: openai(MODEL),
    system: buildSystemPrompt(),
    messages,
    tools: chatbotTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
