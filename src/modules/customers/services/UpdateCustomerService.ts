import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs"
import Customer from "../typeorm/entities/customers";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";

interface IRequest
{
    id:string
    name:string;
    email:string;
}

export default class UpdateCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(repository: ICustomersRepository){
        this.customerRepository = repository;
    }

    async execute({id , name, email}: IRequest): Promise<Customer>
    {
        let customer = await this.customerRepository.findById(id);

        if(!customer){
            throw new AppError("Customer not found");
        }

        let customerEmailExists = await this.customerRepository.findByEmail(email);

        if(customerEmailExists && customer.email !== email){
            throw new AppError("Email already exists.")
        }
        
        customer.name = name;
        customer.email = email;

        this.customerRepository.save(customer);

        return customer
    }
}