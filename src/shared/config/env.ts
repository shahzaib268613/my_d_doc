import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY is required'),
})

export type Env = z.infer<typeof envSchema>

function readEnv(): Env {
  const parsed = envSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  })

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new Error(`Invalid environment configuration: ${details}`)
  }

  return parsed.data
}

let cachedEnv: Env | undefined

/** Validated public env. Call only when Supabase features are used. */
export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = readEnv()
  }
  return cachedEnv
}
