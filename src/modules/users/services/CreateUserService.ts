import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IRequestUser from "./IResquestUser";
import { hash } from "bcryptjs"

export default class CreateUserService
{
    private repository: IUserRepository;

    constructor(repository: IUserRepository){
        this.repository = repository;
    }

    async execute({name, email, password}: IRequestUser): Promise<User>
    {
        let emailExists = await this.repository.findByEmail(email);

        if(emailExists){
            throw new AppError("Email already used.");
        }
        const saltLeght = 8;
        let hashedPassword:string = await hash(password, saltLeght);

        let user = new User(
            name, 
            email, 
            hashedPassword
        )
        await this.repository.save(user);

        return user;
    }
}