import Customer from "@modules/customers/typeorm/entities/customers";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ICustomersRepository from "@modules/customers/typeorm/repositories/ICustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import { connection } from "@shared/typeorm";
import Order from "../typeorm/entities/Order";
import IOrderRepository from "../typeorm/repositories/IOrderRepository";
import OrderRepository from "../typeorm/repositories/OrderRepository";
import CreateOrderService from "./CreateOrderService";
import ShowsOrderService from "./ShowOrderService";


class OrderServiceFactory
{
    private orderRepository: IOrderRepository;
    private customerRepository: ICustomersRepository;
    private productRepostirory: ProductRepository;
    constructor(orderRepository: IOrderRepository, 
                customerRepository: ICustomersRepository, 
                productRepository: ProductRepository){
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.productRepostirory = productRepository;
    }

    public GetShowOrderService(): ShowsOrderService
    {
        return new ShowsOrderService(this.orderRepository);
    }

    public GetCreateOrderService(): CreateOrderService
    {
        return new CreateOrderService(this.orderRepository,
                                    this.customerRepository,
                                   this.productRepostirory)
    }
}


const order_repository = new OrderRepository(connection.getRepository(Order));
const customer_repostory = new CustomersRepository(connection.getRepository(Customer));
const product_repository = new ProductRepository();

export const orderService = new OrderServiceFactory(order_repository, customer_repostory, product_repository); 