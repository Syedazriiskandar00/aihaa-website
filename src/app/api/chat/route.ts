import { openai } from "@ai-sdk/openai";
import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { buildSystemPrompt } from "@/lib/chatbot/system-prompt";
import { chatbotTools } from "@/lib/chatbot/tools";

// AI SDK v6 chat route. Persona + product/service knowledge come from
// buildSystemPrompt(); handoff tools come from chatbotTools.
//
// v6 notes:
// - useChat sends UIMessage[] (role + parts:[{type:"text",text}]), NOT
//   ModelMessage[]. streamText needs model messages, so we run them
//   through convertToModelMessages() first — otherwise streamText throws
//   AI_InvalidPromptError ("messages do not match ModelMessage[]").
// - result.toUIMessageStreamResponse() is the v6 replacement for the
//   v4 toDataStreamResponse() (which no longer exists).
// - stopWhen: stepCountIs(5) is the v6 replacement for v4 maxSteps — it
//   lets the model call a tool, receive the result, then continue the
//   reply naturally (up to 5 steps) instead of stopping after the call.

export const maxDuration = 30;

// gpt-4o-mini — cheapest viable (~$0.15 / 1M input). Swap here only.
const MODEL = "gpt-4o-mini";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // openai() reads OPENAI_API_KEY lazily at request time, so the build
  // succeeds without the key set — it's only needed to actually run.
  const result = streamText({
    model: openai(MODEL),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: chatbotTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
