import AppError from "@shared/errors/AppError";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IRequestUser from "./IResquestUser";

export default class CreateUserService
{
    private repository: IUserRepository;
    private hashprovider: IHashProvider;

    constructor(repository: IUserRepository, hashprovider: IHashProvider){
        this.repository = repository;
        this.hashprovider = hashprovider
    }

    async execute({name, email, password}: IRequestUser): Promise<User>
    {
        
        let emailExists = await this.repository.findByEmail(email);

        console.log(emailExists);
        
        if(emailExists){
            throw new AppError("Email already used.");
        }
        let hashedPassword:string = await this.hashprovider.genenerateHash(password);


        let user = new User(
            name, 
            email, 
            hashedPassword,
        )

        console.log(user);
        
        await this.repository.save(user);

        return user;
    }
}