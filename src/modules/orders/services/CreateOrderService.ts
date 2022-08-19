import ICustomersRepository from "@modules/customers/typeorm/repositories/ICustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import IOrderRepository from "../typeorm/repositories/IOrderRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest 
{
    customer_id: string;
    products: Array<IProduct>;
}

export default class CreateOrderService 
{

    constructor ( private orderRepository: IOrderRepository, 
                private customerRepository: ICustomersRepository,
                private productRepository: ProductRepository) {}

    public async execute({customer_id , products}: IRequest): Promise<Order>
    {
        const customerExists = await this.customerRepository.findById(customer_id);

        if (!customerExists) throw new AppError("Customer not found");

        const existsProducts = await this.productRepository.findAllByIds(products);

        if (!existsProducts.length) throw new AppError("Products Ids not Found.");

        const existsProductsId = existsProducts.map( (product) => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsId.includes(product.id),
        );

        console.log(checkInexistentProducts);
        

        if (checkInexistentProducts.length) throw new AppError(`${checkInexistentProducts[0].id} not found.`);

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity,
        );

        if (quantityAvailable.length) throw new AppError(`The quantiry ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
    
        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        )

        const order = await this.orderRepository.save({ customer: customerExists, products: serializedProducts});
        
        const updateProductQuantity = order.order_products.map( product => ({
            id: product.product_id,
            quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }));

        await this.productRepository.updateQuantity(updateProductQuantity);
        
        return order
    }
}