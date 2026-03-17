// Redis cache utilities
import { getRedisClientOrNull } from '@/lib/redis/client';

export class CacheService {
  private client: ReturnType<typeof getRedisClientOrNull> | undefined = undefined;

  private getClient() {
    if (this.client !== undefined) return this.client;
    this.client = getRedisClientOrNull();
    return this.client;
  }

  async get<T>(key: string): Promise<T | null> {
    const client = this.getClient();
    if (!client) return null;
    const value = await client.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
      await client.setex(key, ttl, serialized);
    } else {
      await client.set(key, serialized);
    }
  }

  async delete(key: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    await client.del(key);
  }

  async deletePattern(pattern: string): Promise<void> {
    const client = this.getClient();
    if (!client) return;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  }

  async exists(key: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;
    const result = await client.exists(key);
    return result === 1;
  }
}

export const cache = new CacheService();
