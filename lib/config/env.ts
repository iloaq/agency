// Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
import { z } from 'zod';

const envSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  
  // Directus
  DIRECTUS_URL: z.string().url().optional(),
  DIRECTUS_TOKEN: z.string().optional(),
  DIRECTUS_STATIC_TOKEN: z.string().optional(),
  
  // Redis
  REDIS_URL: z.string().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  
  // MySQL
  DATABASE_URL: z.string().url().optional(),
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error);
    throw new Error('Invalid environment variables');
  }
  cachedEnv = parsed.data;
  return cachedEnv;
}

export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = getEnv()[key];
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing environment variable: ${String(key)}`);
  }
  return value as NonNullable<Env[K]>;
}
