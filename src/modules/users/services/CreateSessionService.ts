import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IResponseUser from "./IResponseUser";
import { Secret, sign } from "jsonwebtoken"
import authConfig from "@config/auth"
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IResquestUserSession
{
    email: string;
    password: string;
}

export default class CreateSessionService
{
    private repository: IUserRepository;
    private hashprovider: IHashProvider;


    constructor(repository: IUserRepository, hashprovider:IHashProvider){
        this.repository = repository;
        this.hashprovider = hashprovider

    }

    async execute({ email, password}: IResquestUserSession): Promise<IResponseUser>
    {
        let user = await this.repository.findByEmail(email);

        if(!user){
            throw new AppError("Email incorrect", 401);
        }

        let passwordConfirm = await this.hashprovider.compareHash(password, user.password);

        if(!passwordConfirm){
            throw new AppError("Password incorrect", 401)
        }

        const token = sign({}, authConfig.jwt.secret as Secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        
        return {
            user,
            token
        };
    }
}