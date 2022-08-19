import { Request, Response } from "express";
import { customerServiceFactory } from "../services/CustomerServiceFactory";



export default class CustomerController
{
    public async index(request: Request, response: Response): Promise<Response>
    {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 10;
        let listCustomerService = customerServiceFactory.GetListCustomerService();
        
        let listCustomer = await listCustomerService.execute({page, limit});

        return response.json(listCustomer);
    }

    public async show(request: Request, response: Response): Promise<Response>
    {
       let { id } = request.params;

       let showCustomerService = customerServiceFactory.GetShowCustomerService();

       let customer = await showCustomerService.execute({ id });

       return response.json(customer);
    }

    public async create (request: Request, response: Response): Promise<Response>
    {
        let { name, email } = request.body;

        let createCustomerService = customerServiceFactory.GetCreateCustomerService();

        let customer = await createCustomerService.execute({ name, email});

        return response.json(customer);
    }

    public async update ( request: Request, response: Response): Promise<Response>
    {
        let { name, email} = request.body;
        let { id } = request.params;

        let updateCustomerService =  customerServiceFactory.GetUpdateCustomerService();

        let customer = await updateCustomerService.execute({
            id,
            name,
            email
        });

        return response.json(customer)
    }

    public async delete ( request: Request, response: Response): Promise<Response>
    {
        let { id } = request.params;

        let deleteCustomerService = customerServiceFactory.GetDeleteCustomerService();

        await deleteCustomerService.execute({ id });

        return response.json([])
    }
}