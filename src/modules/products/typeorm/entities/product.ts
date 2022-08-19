import Order from "@modules/orders/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("products")
export default class Product
{
    @PrimaryGeneratedColumn("uuid")
    public id: string | undefined;

    @Column()
    public name: string;


    @OneToMany(() => OrdersProducts, orders_products => orders_products.product)
    public order_products: Array<OrdersProducts> 

    @Column("decimal")
    public price: number;

    @Column("int")
    public quantity: number;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor(name:string , price: number, quantity: number, id?:string){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = id
    }
}