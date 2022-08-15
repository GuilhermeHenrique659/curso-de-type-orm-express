import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_tokens")
export default class UserToken {

    @PrimaryGeneratedColumn("uuid")
    public id: string | undefined;

    @Column()
    @Generated("uuid")
    public token: string | undefined;

    @Column()
    public user_id: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    constructor ( user_id: string, token?: string, id?: string) {
        this.token = token;
        this.user_id = user_id;
        this.id = id
    }
}