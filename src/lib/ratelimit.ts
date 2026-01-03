import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const loginRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "2 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/login",
});

export const registerRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "10 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/signup",
});
