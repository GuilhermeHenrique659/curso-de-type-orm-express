import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    public id: string | undefined;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password?: string;

    @Column({nullable: true})
    public avatar?: string

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor (name: string, email: string, password?: string, avatar?: string, id?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.id = id
    }
}