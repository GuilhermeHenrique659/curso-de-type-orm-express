import { getCustomRepository } from "typeorm"
import ProductRepository from "../typeorm/repositories/ProductsRepository"
import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";
import IServiceFactory from "./IserviceFactory";
import ListProductService from "./ListProductService"
import ShowProductService from "./ShowProductService";
import UpdateProductService from "./UpdateProductService";

export default class ServiceFactory implements IServiceFactory{
    private repository: ProductRepository;

    constructor (repository: ProductRepository) 
    {
        this.repository = repository;
    }

    public ListProductService(): ListProductService 
    {
        return new ListProductService(this.repository);
    }
    public ShowProductService(): ShowProductService 
    {
        return new ShowProductService(this.repository);
    }
    public UpdateProductService(): UpdateProductService
    {
        return new UpdateProductService(this.repository);
    }
    public CreateProductService(): CreateProductService
    {
        return new CreateProductService(this.repository);
    }
    public DeleteProductService(): DeleteProductService
    {
        return new DeleteProductService(this.repository);
    }

}
const customProductRepository = ProductRepository
const productRepository = getCustomRepository(customProductRepository);

export const serviceFactory = new ServiceFactory(productRepository);