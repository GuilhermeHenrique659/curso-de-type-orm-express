import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";
import ListProductService from "./ListProductService";
import ShowProductService from "./ShowProductService";
import UpdateProductService from "./UpdateProductService";

export default interface IServiceFactory
{
    GetListProductService(): ListProductService;
    GetShowProductService(): ShowProductService;
    GetUpdateProductService(): UpdateProductService;
    GetCreateProductService(): CreateProductService;
    GetDeleteProductService(): DeleteProductService;
}