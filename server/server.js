import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "1mb" }));

const hasKey = !!process.env.OPENAI_API_KEY;
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.get("/", (_req, res) => res.send("Iterra-GO API is running. Try /api/health"));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, ai: hasKey ? "enabled" : "stub" })
);

app.post("/api/ai", async (req, res) => {
  const { prompt, context, response_json_schema } = req.body ?? {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt (string)." });
  }

  // ✅ No key yet → return stub JSON (keeps UI working)
  if (!hasKey) {
    return res.json({
      text: response_json_schema 
        ? JSON.stringify({ stub: true, message: "AI offline" })
        : "AI is offline (no API key set). Backend is healthy and ready.",
      stub: true
    });
  }

  try {
    const input = (context ? `Context:\n${context}\n\n` : "") + prompt;
    const options = {
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: [
        { role: "system", content: "You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions." },
        { role: "user", content: input }
      ],
      temperature: 0.7,
      max_completion_tokens: 1500
    };

    // Enable JSON mode if schema provided
    if (response_json_schema) {
      options.response_format = { type: "json_object" };
    }

    const r = await openai.chat.completions.create(options);
    return res.json({ text: r.choices[0].message.content });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "AI server error" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`AI server listening on ${port}`));

