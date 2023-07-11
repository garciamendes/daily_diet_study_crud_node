// Third party
import { config } from 'dotenv'
import { z as zod } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = zod.object({
  NODE_ENV: zod.enum(['development', 'production', 'test']).default('production'),
  DATABASE_CLIENT: zod.enum(['sqlite', 'pg']),
  DATABASE_URL: zod.string(),
  PORT: zod.coerce.number().default(3000),
  ALLOWED_ORIGINS: zod.string(),
  JWT_SECRET: zod.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('ERROR: verifique suas envs', _env.error.format())
  throw new Error('ERROR: verifique suas envs')
}

export const env = _env.data