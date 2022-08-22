import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/customers";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";

interface IRequest
{
    name:string;
    email:string;
}

export default class CreateCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(repository: ICustomersRepository){
        this.customerRepository = repository;
    }

    async execute({name, email}: IRequest): Promise<Customer>
    {
        let emailExists = await this.customerRepository.findByEmail(email);

        if(emailExists){
            throw new AppError("Email already used.");
        }
        
        let customer = new Customer(name, email);

        this.customerRepository.save(customer);

        return customer
    }
}