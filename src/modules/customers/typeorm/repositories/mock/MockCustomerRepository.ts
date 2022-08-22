import { Repository } from "typeorm";
import Customer from "../../entities/customers";
import ICustomersRepository, { SeachParams } from "../ICustomersRepository";
import { v4 as uuidv4 } from "uuid"
import { ICustomerPaginate } from "../CustomersRepository";



export default class MockCustomersRepository 
implements ICustomersRepository
{
    private ormRepository: Array<Customer> = [];


   public async findById(id: string): Promise<Customer | null> {
        const customer = this.ormRepository.find(customer => customer.id === id)
        if ( customer === undefined) return null
        return customer;
   }

   public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.ormRepository.find(customer => customer.email === email)
    if ( customer === undefined) return null

    return customer;
   }

    public async findByName(name: string): Promise<Customer | null> {
        const customer = this.ormRepository.find(customer => customer.name === name)
        if ( customer === undefined) return null

        return customer;
    }

    public async findAll({ page, skip, take }: SeachParams): Promise<ICustomerPaginate> {
        let customers = this.ormRepository
       
        const result = {
            per_page: take,
            total: 10,
            current_page: page,
            data: customers
        }

        return result;
    }

    public async save(customer:Customer): Promise<void> {
        customer.id = uuidv4();

        this.ormRepository.push(customer);
    }

   public async remove(customer: Customer): Promise<void> {}
}