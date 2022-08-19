import { Request, Response } from "express";
import { orderService } from "../services/OrderServiceFactory";


export default class OrderController
{


    public async show(request: Request, response: Response): Promise<Response>
    {
        let { id } = request.params;
        let showService = orderService.GetShowOrderService()

        let order = await showService.execute(id);

        return response.json(order);

    }

    public async create (request: Request, response: Response): Promise<Response>
    {
        const { customer_id, products } = request.body;

        const create_order = orderService.GetCreateOrderService();

        const order = await create_order.execute({
            customer_id,
            products
        });

        console.log(order);
        

        return response.json(order);
    }

}