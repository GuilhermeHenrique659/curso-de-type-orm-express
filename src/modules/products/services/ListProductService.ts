import redisCache from "@shared/cache/RedisCache";
import Product from "../typeorm/entities/product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

export default class ListProductService
{
    private productRepository: ProductRepository;

    constructor ( repository: ProductRepository)
    {
        this.productRepository = repository;
    }

    public async execute(): Promise< Array<Product> >  {
        let productsList = await redisCache.recover< Array<Product> >("api-venv-PRODUCT_LIST");

        if (!productsList){
            productsList = await this.productRepository.findAll()

            await redisCache.save("api-venv-PRODUCT_LIST", productsList);
        }
        
        return productsList;
    }
}