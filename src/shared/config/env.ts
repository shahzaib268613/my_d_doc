import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url('VITE_API_URL must be a valid URL').default('http://localhost:3000'),
  VITE_SITE_URL: z
    .string()
    .url('VITE_SITE_URL must be a valid URL')
    .default('http://localhost:5173'),
})

export type Env = z.infer<typeof envSchema>

function readEnv(): Env {
  const parsed = envSchema.safeParse({
    VITE_API_URL: import.meta.env.VITE_API_URL || undefined,
    VITE_SITE_URL: import.meta.env.VITE_SITE_URL || undefined,
  })

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => issue.message).join('; ')
    throw new Error(`Invalid environment configuration: ${details}`)
  }

  return parsed.data
}

let cachedEnv: Env | undefined

/** Validated public frontend env. */
export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = readEnv()
  }
  return cachedEnv
}
