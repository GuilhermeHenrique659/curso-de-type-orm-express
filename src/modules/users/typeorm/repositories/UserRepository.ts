import { Like, Repository } from "typeorm";
import User from "../entities/users";
import IUserRepository from "./IUserRepository";

export default class UserRepository implements IUserRepository
{
    private ormRepository: Repository<User>

    constructor (repository: Repository<User>){
        this.ormRepository = repository;
    }

    public async save(user: User): Promise<void>
    {
        await this.ormRepository.save(user);
    }

    public async findAll(): Promise<Array<User>>
    {
        let listUsers = await this.ormRepository.find();
        return listUsers;
    }

    public async remove(user: User): Promise<void>
    {
        this.ormRepository.remove(user);
    }

    public async findByName(name: string): Promise<User | null>
    {
        let user = await this.ormRepository.findOne({
                where: {
                    name
                }
        });
        return user;
    }
    public async findById(id: string): Promise<User | null>
    {
        let user = await this.ormRepository.findOne({
                where: {
                    id
                }
        });
        return user;
    }
    public async findByEmail(email: string): Promise<User | null>
    {
        
        let user = await this.ormRepository.findOne({
                where: {
                    email
                }
        });
        
        return user;
    }
}
