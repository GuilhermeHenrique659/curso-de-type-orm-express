import ICustomersRepository from "@modules/customers/typeorm/repositories/ICustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import IOrderRepository from "../typeorm/repositories/IOrderRepository";

export default class ShowsOrderService 
{

    constructor ( private orderRepository: IOrderRepository) {}

    public async execute(id: string): Promise<Order>
    {
        const order = await this.orderRepository.findById(id);

        if (!order) throw new AppError("Order not found.");

        return order;
    }
}