import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";

export default class ListUserService
{
    private repository: IUserRepository;

    constructor(repository: IUserRepository){
        this.repository = repository;
    }

    async execute(): Promise<Array<User>>
    {
        let usersList = await this.repository.findAll();
        
        return usersList
    }
}