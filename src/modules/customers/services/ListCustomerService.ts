import Customer from "../typeorm/entities/customers";
import { ICustomerPaginate } from "../typeorm/repositories/CustomersRepository";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";



export default class ListCustomerService
{
    private customerRepository: ICustomersRepository;

    constructor(customerRepository: ICustomersRepository){
        this.customerRepository = customerRepository;
    }

    public async execute({page, limit}: {page:number, limit: number}): Promise<ICustomerPaginate>
    {
        const take = limit;
        const skip = (Number(page)-1) * take
        let customerList = await this.customerRepository.findAll({
            page,
            skip,
            take
        });

        return customerList;
    }
}