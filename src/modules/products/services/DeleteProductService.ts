import redisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

export default class DeleteProductService
{
    private productRepository: ProductRepository

    constructor(repository: ProductRepository)
    {
        this.productRepository = repository
    }

    public async execute(id: string): Promise<void>
    {
        let product = await this.productRepository.findOneById(id);

        if (!product) {
            throw new AppError ("Product not found.")
        }

        await redisCache.invalidate("api-venv-PRODUCT_LIST");

        await this.productRepository.remove(product)

    }
}