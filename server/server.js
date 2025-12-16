import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "1mb" }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, context } = req.body ?? {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt (string)." });
    }

    const input = (context ? `Context:\n${context}\n\n` : "") + prompt;

    const r = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: [
        { role: "system", content: "You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions." },
        { role: "user", content: input }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    // Extract the response text from OpenAI API v4
    return res.json({ text: r.choices[0].message.content });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "AI server error" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`AI server listening on ${port}`));

