import { Repository } from "typeorm"
import Customer from "../entities/customers"

export default interface ICustomersRepository
{    
    findById(id:string): Promise<Customer | null>;
    findByName(name: string): Promise<Customer | null>;
    findByEmail(email: string): Promise<Customer | null>;
    findAll(): Promise<Array<Customer>>
    save(customer:Customer): Promise<void>;
    remove(customer:Customer):Promise<void>;
}