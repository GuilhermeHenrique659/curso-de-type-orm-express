import { th } from "date-fns/locale";
import { Repository } from "typeorm";
import Customer from "../entities/customers";
import ICustomersRepository from "./ICustomersRepository";


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

    public async findAll(): Promise<Customer[]> {
        let customerList = await this.ormRepository.find();
        return customerList;
    }

    public async save(customer:Customer): Promise<void> {
        await this.ormRepository.save(customer);
    }
    public async remove(customer: Customer): Promise<void> {
        await this.ormRepository.remove(customer);
    }
}