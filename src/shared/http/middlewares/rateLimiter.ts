import AppError from "@shared/errors/AppError"
import { NextFunction, Request, Response } from "express"
import { RateLimiterRedis } from "rate-limiter-flexible"
import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from "@config/cache"

const redisClient = new Redis(cacheConfig.config.redis);


const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "ratelimit",
    points: 5,
    duration: 1
})

export default async function rateLImiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void>
{
    try {
        await limiter.consume(request.ip);

        return next();
    } catch (error) {
        throw new AppError("too many requests.", 429)
    }
}