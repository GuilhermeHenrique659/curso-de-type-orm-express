import AppError from "@shared/errors/AppError";
import { Product } from "../typeorm/entities/product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import { IRequestProducts } from "./IRequestProduct";

export default class UpdateProductService 
{

    private productRepository: ProductRepository

    constructor(repository: ProductRepository)
    {
        this.productRepository = repository;
    }

    public async execute({ id, name, price, quantity }: IRequestProducts): Promise<Product>
    {
        let product = await this.productRepository.findOne(id);

        if (!product) {
            throw new AppError ("Product not found.")
        }

        let productExists = await this.productRepository.findByName(name);

        if (productExists && name !== product.name){
            throw new AppError("Product Already exists.");
        }
        
        product.id = id;
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await this.productRepository.save(product)

        return product;
    }
}