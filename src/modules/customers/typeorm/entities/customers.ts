import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("customers")
export default class Customer {

    @PrimaryGeneratedColumn("uuid")
    public id: string | undefined;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor (name: string, email: string, id?: string) {
        this.name = name;
        this.email = email;
        this.id = id
    }
}