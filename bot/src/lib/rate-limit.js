/**
 * Simple in-memory rate limiter (per-process). Good enough for MVP abuse basics.
 * Replace with Redis / DB when you run multiple bot replicas.
 */

const buckets = new Map();

/**
 * @param {string} key
 * @param {number} windowMs
 * @param {number} max
 * @returns {{ ok: true } | { ok: false, retryAfterSec: number }}
 */
export function takeToken(key, windowMs, max) {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now - bucket.start >= windowMs) {
    bucket = { start: now, count: 0 };
    buckets.set(key, bucket);
  }
  if (bucket.count >= max) {
    const retryAfterSec = Math.max(1, Math.ceil((bucket.start + windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }
  bucket.count += 1;
  return { ok: true };
}

/** Periodic cleanup so the Map does not grow forever on busy bots. */
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now - bucket.start > 15 * 60 * 1000) buckets.delete(key);
  }
}, 5 * 60 * 1000).unref?.();
