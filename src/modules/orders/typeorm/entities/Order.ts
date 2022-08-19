import Customer from "@modules/customers/typeorm/entities/customers";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";

@Entity("orders")
export default class Order
{
    @PrimaryGeneratedColumn("uuid")
    public id: string ;

    @ManyToOne(() => Customer)
    @JoinColumn({name: "customer_id"})
    public customer: Customer;

    @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
        cascade: true
    })
    public order_products: Array<OrdersProducts>

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor(){

    }
}