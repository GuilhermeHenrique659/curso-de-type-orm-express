import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs"
import Customer from "../typeorm/entities/customers";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";

interface IRequest
{
    id:string;
}

export default class ShowCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(repository: ICustomersRepository){
        this.customerRepository = repository;
    }

    async execute({id}: IRequest): Promise<Customer>
    {
        let customer = await this.customerRepository.findById(id);

        if(!customer){
            throw new AppError("Customer not found.");
        }

        return customer
    }
}