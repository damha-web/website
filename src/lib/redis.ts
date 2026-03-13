import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  console.error(
    "[Redis] Missing environment variables: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. Admin features will not work."
  );
}

export const redis = new Redis({
  url: url || "",
  token: token || "",
});
