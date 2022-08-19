import Product from "@modules/products/typeorm/entities/product";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";

@Entity("orders_products")
export default class OrdersProducts
{
    @PrimaryGeneratedColumn("uuid")
    public id: string ;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: "order_id" })
    public order: Order

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: "product_id" })
    public product: Product

    @Column()
    public order_id: string;

    @Column()
    public product_id: string;

    @Column("decimal")
    public price: number;

    @Column("int")
    public quantity: number;
    
    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor(){

    }
}