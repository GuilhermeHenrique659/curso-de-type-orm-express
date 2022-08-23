import { Repository } from "typeorm";
import Customer from "../../entities/customers";
import ICustomersRepository, { SeachParams } from "../ICustomersRepository";
import { v4 as uuidv4 } from "uuid"
import { ICustomerPaginate } from "../CustomersRepository";



export default class MockCustomersRepository
    implements ICustomersRepository {
    private ormRepository: Array<Customer> = [];


    public async findById(id: string): Promise<Customer | null> {
        try {            
            const customer = this.ormRepository.find(customer => customer.id === id)
            if (customer === undefined) return null
            return customer;
        } catch {
            return null
        }
    }

    public async findByEmail(email: string): Promise<Customer | null> {
        try {
            const customer = this.ormRepository.find(customer => customer.email === email)
            if (customer === undefined) return null

            return customer;
        } catch {
            return null
        }
    }

    public async findByName(name: string): Promise<Customer | null> {
        try {
            const customer = this.ormRepository.find(customer => customer.name === name)
            if (customer === undefined) return null

            return customer;
        } catch {
            return null
        }
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

    public async save(customer: Customer): Promise<void> {
        if(!customer.id) {
            customer.id = uuidv4();
            this.ormRepository.push(customer);
        }
        const findIndex = this.ormRepository.findIndex(findCustomer=> findCustomer.id === customer.id);
        this.ormRepository[findIndex] = customer;

    }

    public async remove(customer: Customer): Promise<void> {
        const objIndex = this.ormRepository.findIndex(obj => obj.id === customer.id);
        if (objIndex > -1) {
          this.ormRepository.splice(objIndex, 1);
        }        
    }
}