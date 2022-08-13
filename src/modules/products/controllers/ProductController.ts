import { Request, Response } from "express";
import IServiceFactory from "../services/IserviceFactory";
import ListProductService from "../services/ListProductService";
import ServiceFactory, { serviceFactory } from "../services/ServiceFactory";


export default class ProductController
{
    public async index(request: Request, response: Response): Promise<Response>
    {
        const listService = serviceFactory.GetListProductService();
        
        return response.json( await listService.execute());
    }

    public async show(request: Request, response: Response): Promise<Response>
    {
        let { id } = request.params;
        let showService = serviceFactory.GetShowProductService();

        let product = await showService.execute(id);

        return response.json(product);

    }

    public async create (request: Request, response: Response): Promise<Response>
    {
        let { name, price, quantity} = request.body;
        
        let createService = serviceFactory.GetCreateProductService();

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

        let updateService = serviceFactory.GetUpdateProductService();

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

        let deleteService = serviceFactory.GetDeleteProductService();

        await deleteService.execute(id);

        return response.json({message: "delete with success"});
    }
}