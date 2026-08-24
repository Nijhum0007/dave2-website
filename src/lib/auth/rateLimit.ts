/**
 * Simple in-memory rate limiter.
 *
 * NOTE: This works for single-instance Node.js deployments.
 * For serverless (Vercel), use @upstash/ratelimit with Redis for
 * persistence across function invocations.
 */

const attempts = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_INTERVAL = 60_000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, record] of attempts) {
    if (now > record.resetAt) attempts.delete(key);
  }
}

/**
 * Check if a request is within the rate limit.
 * @param key - Unique identifier (e.g., IP address)
 * @param maxAttempts - Maximum allowed attempts within the window
 * @param windowMs - Time window in milliseconds (default 15 minutes)
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  cleanup();
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterSec: 0 };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    retryAfterSec: 0,
  };
}
