import Customer from "@modules/customers/typeorm/entities/customers";
import Order from "../entities/Order";

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: Array<IProduct>;
}

export default interface IOrderRepository 
{
    findById(id: string): Promise<Order | null>;
    save({ customer, products }: IRequest): Promise<Order>;
}