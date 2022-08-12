import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";
import ListProductService from "./ListProductService";
import ShowProductService from "./ShowProductService";
import UpdateProductService from "./UpdateProductService";

export default interface IServiceFactory
{
    ListProductService(): ListProductService;
    ShowProductService(): ShowProductService;
    UpdateProductService(): UpdateProductService;
    CreateProductService(): CreateProductService;
    DeleteProductService(): DeleteProductService;
}