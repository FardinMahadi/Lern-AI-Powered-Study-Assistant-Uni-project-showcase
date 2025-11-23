import OpenAI from 'openai';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error(
    'GROQ_API_KEY is not set. Please add it to your .env.local file. Requests to Groq will fail.'
  );
}

export const groqClient = new OpenAI({
  apiKey,
  baseURL: 'https://api.groq.com/openai/v1',
  timeout: 60000, // 60 seconds
  maxRetries: 1, // Let our route handle retries with fallback
});

// Validate API key on module load
if (!apiKey && typeof window === 'undefined') {
  console.warn('⚠️  GROQ_API_KEY is missing. Chat functionality will not work until configured.');
}

export default groqClient;
