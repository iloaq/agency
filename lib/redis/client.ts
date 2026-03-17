// Source: https://github.com/redis/ioredis
import Redis from 'ioredis';
import { getEnv } from '@/lib/config/env';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (redis) {
    return redis;
  }

  const env = getEnv();

  if (env.REDIS_URL) {
    redis = new Redis(env.REDIS_URL);
  } else if (env.REDIS_HOST) {
    redis = new Redis({
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT || '6379'),
      password: env.REDIS_PASSWORD,
    });
  } else {
    throw new Error('Redis configuration is missing');
  }

  redis.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  return redis;
}

export function getRedisClientOrNull(): Redis | null {
  try {
    return getRedisClient();
  } catch {
    return null;
  }
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
