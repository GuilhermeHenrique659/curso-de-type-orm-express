import redisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import { IRequestProducts } from "./IRequestProduct";

export default class CreateProductService 
{

    private productRepository: ProductRepository

    constructor(repository: ProductRepository)
    {
        this.productRepository = repository;
    }

    public async execute({name, price, quantity}: IRequestProducts): Promise<Product>
    {
        let productExists = await this.productRepository.findByName(name);
        
        if (productExists){
            throw new AppError("Product Already exists.");
        }

        let product = new Product(name, price, quantity)
        
        await this.productRepository.save(product)

        await redisCache.invalidate("api-venv-PRODUCT_LIST");

        return product;
    }
}