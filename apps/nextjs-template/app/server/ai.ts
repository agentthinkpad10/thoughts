import Anthropic from "@anthropic-ai/sdk";

// Use OpenRouter for lightweight categorization
const client = new Anthropic({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.io/api/v1" : undefined,
});

export interface ThoughtAnalysis {
  categories: string[];
}

export async function analyzeThought(text: string): Promise<ThoughtAnalysis> {
  const model = process.env.OPENROUTER_API_KEY ? "qwen/qwen-2.5-7b-instruct" : "claude-haiku-4-5-20251001";

  const message = await client.messages.create({
    model,
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Categorize this thought. Respond with ONLY a JSON object, no other text.

{"categories": ["category1", "category2"]}

Use 1-4 short labels (1-3 words). Choose from: Work, Health, Finance, Relationships, Creativity, Learning, Personal Growth, Productivity, Home, Travel, or create specific ones.

Thought: "${text.replace(/"/g, '\\"')}"`,
      },
    ],
  });

  const raw = message.content[0];
  if (raw?.type !== "text") throw new Error("Unexpected response type");

  const parsed = JSON.parse(raw.text) as ThoughtAnalysis;

  if (!Array.isArray(parsed.categories)) {
    throw new Error("Invalid response shape");
  }

  return {
    categories: parsed.categories.slice(0, 4),
  };
}
