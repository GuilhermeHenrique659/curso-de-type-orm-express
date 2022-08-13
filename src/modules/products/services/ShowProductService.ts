import AppError from "@shared/errors/AppError";
import { Product } from "../typeorm/entities/product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

export default class ShowProductService
{
    private productRepository: ProductRepository

    constructor(repository: ProductRepository)
    {
        this.productRepository = repository
    }

    public async execute(id: string): Promise<Product>
    {
        let product = await this.productRepository.findOneById(id);

        if (!product) {
            throw new AppError ("Product not found.")
        }

        return product;
    }
}