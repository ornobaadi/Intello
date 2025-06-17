/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { env } from '~/env';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash', {
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    }),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}