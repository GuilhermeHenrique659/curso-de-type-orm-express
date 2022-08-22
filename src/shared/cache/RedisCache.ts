import cacheConfig from "@config/cache";
import Redis, { Redis as RedisClient } from 'ioredis';


class RedisCache
{
    private client: RedisClient;

    constructor ( ){
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void>
    {
        this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null>
    {
        const data = await this.client.get(key);

        if (!data){
            return null
        }

        const parseData = JSON.parse(data) as T;

        return parseData
    }

    public async invalidate(key: string): Promise<void>
    {
        await this.client.del(key);
    }
}

const redisCache = new RedisCache();
export default redisCache