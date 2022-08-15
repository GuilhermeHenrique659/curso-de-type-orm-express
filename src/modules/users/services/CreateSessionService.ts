import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import { compare, hash } from "bcryptjs"
import IResponseUser from "./IResponseUser";
import { sign } from "jsonwebtoken"
import authConfig from "@config/auth"

interface IResquestUserSession
{
    email: string;
    password: string;
}

export default class CreateSessionService
{
    private repository: IUserRepository;

    constructor(repository: IUserRepository){
        this.repository = repository;
    }

    async execute({ email, password}: IResquestUserSession): Promise<IResponseUser>
    {
        let user = await this.repository.findByEmail(email);

        if(!user){
            throw new AppError("Email incorrect", 401);
        }

        let passwordConfirm = await compare(password, user.password);

        if(!passwordConfirm){
            throw new AppError("Password incorrect", 401)
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });
        
        return {
            user,
            token
        };
    }
}