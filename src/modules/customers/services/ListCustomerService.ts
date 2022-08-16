import Customer from "../typeorm/entities/customers";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";


export default class ListCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(customerRepository: ICustomersRepository){
        this.customerRepository = customerRepository;
    }

    public async execute(): Promise<Array<Customer>>
    {
        let customerList = await this.customerRepository.findAll();

        return customerList;
    }
}