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

    public GetListProductService(): ListProductService 
    {
        return new ListProductService(this.repository);
    }
    public GetShowProductService(): ShowProductService 
    {
        return new ShowProductService(this.repository);
    }
    public GetUpdateProductService(): UpdateProductService
    {
        return new UpdateProductService(this.repository);
    }
    public GetCreateProductService(): CreateProductService
    {
        return new CreateProductService(this.repository);
    }
    public GetDeleteProductService(): DeleteProductService
    {
        return new DeleteProductService(this.repository);
    }

}
const productRepository = new ProductRepository()

export const serviceFactory = new ServiceFactory(productRepository);