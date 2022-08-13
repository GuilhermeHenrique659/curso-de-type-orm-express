import User from "../entities/users";

export default interface IUserRepository{
    save(user: User): Promise<void>;
    findAll(): Promise<Array<User>>;
    remove(user: User): Promise<void>;
    findByName(name: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}