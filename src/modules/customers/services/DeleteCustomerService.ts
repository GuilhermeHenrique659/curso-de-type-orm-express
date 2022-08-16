
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs"
import Customer from "../typeorm/entities/customers";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";

interface IRequest
{
    id:string;
}

export default class DeleteCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(repository: ICustomersRepository){
        this.customerRepository = repository;
    }

    async execute({id}: IRequest): Promise<void>
    {
        let customer = await this.customerRepository.findById(id);

        if(!customer){
            throw new AppError("Customer not found.");
        }

        await this.customerRepository.remove(customer);
    }
}