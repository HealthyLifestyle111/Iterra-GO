import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Initialize OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || "gpt-4";

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "iTerra-GO API Server" });
});

// AI endpoint
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, context } = req.body ?? {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt (string)." });
    }

    // Build the input message
    const userMessage =
      (context ? `Context:\n${context}\n\n` : "") + prompt;

    // Call OpenAI API (correct v4+ syntax)
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const aiText = response.choices[0].message.content;

    return res.json({ text: aiText, response: aiText });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return res.status(500).json({ error: err?.message || "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 AI API server listening on port ${PORT}`);
});
