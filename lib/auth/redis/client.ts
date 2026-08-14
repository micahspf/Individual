/**
 * Redis client for auth (blacklist + refresh tokens)
 *
 * Install:  npm install ioredis
 * Env:      REDIS_URL=redis://localhost:6379
 *           or REDIS_URL=rediss://... for TLS
 *
 * Falls back gracefully if Redis is unavailable (logs warning).
 */

type RedisLike = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: Array<string | number>): Promise<'OK' | null>;
  /** Lua script execution — args are KEYS then ARGV values */
  eval(script: string, numKeys: number, ...args: Array<string | number>): Promise<unknown>;
  del(...keys: string[]): Promise<number>;
  exists(...keys: string[]): Promise<number>;
  sadd(key: string, ...members: string[]): Promise<number>;
  smembers(key: string): Promise<string[]>;
  srem(key: string, ...members: string[]): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  quit(): Promise<'OK'>;
};

let client: RedisLike | null = null;
let initAttempted = false;

export async function getRedis(): Promise<RedisLike | null> {
  if (client) return client;
  if (initAttempted) return null;
  initAttempted = true;

  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn('[auth] REDIS_URL not set — using in-memory store');
    return null;
  }

  try {
    // Dynamic import so the app still builds without ioredis installed
    const Redis = (await import('ioredis')).default;
    const redis = new Redis(url, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true,
    });

    await redis.connect();
    client = redis as unknown as RedisLike;
    console.log('[auth] Redis connected');
    return client;
  } catch (err) {
    console.warn('[auth] Redis unavailable, falling back to memory:', (err as Error).message);
    return null;
  }
}

export function isRedisEnabled(): boolean {
  return !!process.env.REDIS_URL;
}
