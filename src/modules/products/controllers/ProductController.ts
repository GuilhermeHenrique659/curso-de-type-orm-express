import { Request, Response } from "express";
import IServiceFactory from "../services/IserviceFactory";


export default class ProductController
{
    private service: IServiceFactory;

    constructor (service: IServiceFactory) 
    {
        this.service = service
    }

    public async index(request: Request, response: Response): Promise<Response>
    {
        let listService = this.service.ListProductService();

        return response.json( await listService.execute());
    }

    public async show(request: Request, response: Response): Promise<Response>
    {
        let { id } = request.params;
        let showService = this.service.ShowProductService();

        let product = await showService.execute(id);

        return response.json(product);

    }

    public async create (request: Request, response: Response): Promise<Response>
    {
        let { name, price, quantity} = request.body;

        let createService = this.service.CreateProductService();

        let product = await createService.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    public async update ( request: Request, response: Response): Promise<Response>
    {
        let { name, price, quantity} = request.body;
        let { id } = request.params;

        let updateService = this.service.UpdateProductService();

        let product = await updateService.execute({
            id,
            name,
            price,
            quantity
        });

        return response.json(product)
    }

    public async delete ( request: Request, response: Response): Promise<Response>
    {
        let { id } = request.params;

        let deleteService = this.service.DeleteProductService();

        await deleteService.execute(id);

        return response.json({message: "delete with success"});
    }
}