import { Repository } from "typeorm";
import Customer from "../entities/customers";
import ICustomersRepository, { SeachParams } from "./ICustomersRepository";

export interface ICustomerPaginate {
    per_page: number;
    total: number;
    current_page: number;
    data: Customer[];
}

export default class CustomersRepository implements ICustomersRepository
{
    private ormRepository: Repository<Customer>;

    constructor(repository: Repository<Customer>){
        this.ormRepository = repository;
    }

    public async findById(id: string): Promise<Customer | null> {
        let customer = await this.ormRepository.findOne({
            where: {
                id
            }
        })

        return customer;
    }
    public async findByEmail(email: string): Promise<Customer | null> {
        let customer = await this.ormRepository.findOne({
            where: {
                email
            }
        })

        return customer;
    }

    public async findByName(name: string): Promise<Customer | null> {
        let customer = await this.ormRepository.findOne({
            where: {
                name
            }
        });
        return customer;
    }

    public async findAll({ page, skip, take }: SeachParams): Promise<ICustomerPaginate> {
        let [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount()
       
        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: customers
        }

        return result;
    }

    public async save(customer:Customer): Promise<void> {
        await this.ormRepository.save(customer);
    }
    public async remove(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}