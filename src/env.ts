import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

// Use import.meta.env.MODE for Astro, fallback to 'development'
const parsed = envSchema.safeParse({
  NODE_ENV: import.meta.env.MODE,
})

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
