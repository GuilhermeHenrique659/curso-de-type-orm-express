import { Product } from "../typeorm/entities/product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

export default class ListProductService
{
    private productRepository: ProductRepository;

    constructor ( repository: ProductRepository)
    {
        this.productRepository = repository;
    }

    public async execute(): Promise< Array<Product> >  {
        let productsList = this.productRepository.find();
        
        return productsList;
    }
}