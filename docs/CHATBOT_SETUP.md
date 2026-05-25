# Chatbot Setup (Phase A — backend foundation)

This covers the manual, dashboard-side steps Azri must do **before** the
chatbot backend actually works. The code (API routes) is already in the
repo; it just needs the API key + KV database wired up.

Two endpoints exist after Phase A:

- `POST /api/chat` — streams an OpenAI reply (AI SDK v6, `gpt-4o-mini`)
- `GET /api/sales-rotation` — atomic round-robin counter (Vercel KV)

Both degrade gracefully: the build and preview deploy succeed even with
no env vars set. `/api/sales-rotation` returns rep `0` until KV is wired;
`/api/chat` only needs the key when a message is actually sent.

---

## Section 1 — OpenAI API key

1. Log in to <https://platform.openai.com> → **API keys** → **Create new secret key**.
2. **Set a budget cap** at **Settings → Limits** — recommend a ~$20/month
   hard cap to start so a runaway loop can't rack up a big bill.
3. Copy the key (starts with `sk-...`). Add it in **two** places:
   - **Local** — create `.env.local` (copy from `.env.example`) and set:
     ```
     OPENAI_API_KEY=sk-your-real-key
     ```
   - **Vercel** — Project → **Settings → Environment Variables** → add
     `OPENAI_API_KEY` for **all three** environments (Production, Preview,
     Development).

---

## Section 2 — Vercel KV (Redis)

> NOTE: Vercel KV is now provisioned through the **Marketplace** (Upstash
> Redis), not the old "Storage → KV" tab.

1. Vercel dashboard → **Storage** (or **Integrations / Marketplace**) →
   **Create Database** → choose the **Redis / KV (Upstash)** option.
2. Name: `aihaa-chatbot-kv`.
3. Region: closest to users — **Singapore** for Malaysia traffic.
4. **Connect it to this project** when prompted. That auto-injects the KV
   env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) into the
   project for all environments.
   - If the integration injects `UPSTASH_REDIS_REST_URL` /
     `UPSTASH_REDIS_REST_TOKEN` instead of the `KV_REST_API_*` names,
     tell me — `@vercel/kv` expects the `KV_REST_API_*` names and we may
     need to alias them (or switch the client to `@upstash/redis`).
5. Pull the vars to local for `npm run dev` testing:
   ```
   npx vercel env pull .env.local
   ```

---

## Section 3 — Test the endpoints (after deploy + env setup)

Replace the host with the current preview URL if it differs.

**Sales rotation** (run several times — counter should climb, index cycles 0→6→0):
```
curl https://aihaa-website-git-feat-home-improvement-sai-media.vercel.app/api/sales-rotation
```
Expected (once KV is wired): `{ "salesIndex": 0, "counter": 1 }`, then
`counter` 2, 3, … and `salesIndex` 1, 2, … 6, 0, 1 on repeat.
Before KV is wired: `{ "salesIndex": 0, "counter": 0, "error": "KV not configured" }`.

**Chat** (needs `OPENAI_API_KEY` set):
```
curl -X POST https://aihaa-website-git-feat-home-improvement-sai-media.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hai"}]}'
```
Expected: a streamed response. Because the route uses the AI SDK v6
`toUIMessageStreamResponse()` protocol, raw `curl` shows the stream as
framed protocol chunks (JSON-ish lines), not clean prose — that's normal;
the Phase C `useChat` UI decodes it into plain text bubbles.

---

## What's NOT done yet (later phases)

- **Phase B** — real AIHAA persona/system prompt + real sales-rep array
  (update `SALES_COUNT` in `/api/sales-rotation/route.ts` to the real
  length).
- **Phase C** — rewire `Chatbot.tsx` to call `/api/chat` via the AI SDK
  v6 `useChat` hook (different API from v4: `sendMessage`,
  `message.parts`, transport).
