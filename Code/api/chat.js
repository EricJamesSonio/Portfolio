/**
 * Chatbot serverless function (Vercel style: `api/chat.js`).
 *
 * SECURITY RULES (AGENTS.md #7, ai-chatbot.md):
 *  - The Groq key is read ONLY from the server environment. It is never sent to the browser,
 *    there is no `PUBLIC_`/`VITE_` variable, and `dangerouslyAllowBrowser` is NOT used.
 *  - Input is validated, truncated, and capped; errors returned to the client are generic.
 *  - Astro output stays static; this function runs on the host platform, not at build time.
 *
 * HOSTING NOTE: this repo deploys to GitHub Pages (`.github/workflows/deploy.yml`), which
 * cannot execute serverless functions. Until the site is hosted on Vercel (or Netlify), the
 * island shows a friendly "assistant unavailable" state instead of failing.
 * For Netlify, copy this file to `netlify/functions/chat.js`.
 */
import Groq from 'groq-sdk';
import { buildSystemPrompt } from '../src/data/chatbot.js';

const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Caps
const MAX_MESSAGES = 10;      // last ~10 turns for context
const MAX_CHARS = 1000;       // per message
const MAX_TOKENS = 500;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Without a key the assistant is simply unavailable; no crash, no key leak.
  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ error: 'Assistant unavailable' });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Bad request' });
  }

  // Keep only the last N messages, force role to user/assistant, cap length.
  const safe = messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m && m.role === 'user' ? 'user' : 'assistant',
    content: String((m && (m.text ?? m.content)) ?? '')
      .slice(0, MAX_CHARS),
  }));

  // Reject a conversation that contains no user turn at all.
  if (!safe.some((m) => m.role === 'user')) {
    return res.status(400).json({ error: 'Bad request' });
  }

  try {
    const systemPrompt = await buildSystemPrompt();
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...safe],
      max_tokens: MAX_TOKENS,
      temperature: 0.6,
    });

    const reply = completion.choices?.[0]?.message?.content;
    if (!reply) return res.status(502).json({ error: 'Upstream error' });

    return res.status(200).json({ reply });
  } catch (err) {
    // Log the error server-side only; never return details to the client.
    console.error('[chat]', err?.message || err);
    return res.status(502).json({ error: 'Upstream error' });
  }
}
