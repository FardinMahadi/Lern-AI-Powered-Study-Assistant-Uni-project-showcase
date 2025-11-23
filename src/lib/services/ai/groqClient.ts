import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.warn("GROQ_API_KEY is not set. Requests to Groq will fail until it is provided.");
}

export const groqClient = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export default groqClient;
