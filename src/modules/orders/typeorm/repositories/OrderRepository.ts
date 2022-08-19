import Customer from "@modules/customers/typeorm/entities/customers";
import { Repository } from "typeorm";
import Order from "../entities/Order";
import IOrderRepository from "./IOrderRepository";

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: Array<IProduct>;
}

export default class OrderRepository implements IOrderRepository
{
    constructor ( private ormRepository: Repository<Order> ){}

    public async findById(id: string): Promise<Order | null> {
        const order = this.ormRepository.findOne({
            where: {
                id
            },
            relations: ["order_products", "customer"],
        });
        return order;
    }

    public async save({ customer, products }: IRequest): Promise<Order> 
    {
        const order = this.ormRepository.create({
            customer,
            order_products: products
        });        

        await this.ormRepository.save(order);


        return order;
    }
}