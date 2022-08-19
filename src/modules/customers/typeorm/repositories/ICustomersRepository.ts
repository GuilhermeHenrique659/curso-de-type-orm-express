import { Repository } from "typeorm"
import Customer from "../entities/customers"
import { ICustomerPaginate } from "./CustomersRepository";


export type SeachParams = {
    page: number;
    skip: number;
    take: number;
}

export default interface ICustomersRepository
{    
    findById(id:string): Promise<Customer | null>;
    findByName(name: string): Promise<Customer | null>;
    findByEmail(email: string): Promise<Customer | null>;
    findAll({ page, skip, take }: SeachParams): Promise<ICustomerPaginate>
    save(customer:Customer): Promise<void>;
    remove(customer:Customer):Promise<void>;
}