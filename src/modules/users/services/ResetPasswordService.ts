import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import UserToken from "../typeorm/entities/userToken";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IUserTokenRepository from "../typeorm/repositories/IUserTokenRepository";
import { isAfter , addHours} from "date-fns"
import { hash } from "bcryptjs"

interface IRequest
{
    token: string;
    password: string;
}

export default class ResetPasswordServices
{
    private userRepository: IUserRepository;

    private tokenRepository: IUserTokenRepository;

    constructor(userRepository: IUserRepository, tokenRepository: IUserTokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public async execute({ token, password }: IRequest): Promise<void>
    {
        const timeForExpireToken = 2;
        const saltHash = 8;

        let user_token =  await this.tokenRepository.findByToken(token);

        if(!user_token){
            throw new AppError("User Token does not exists.");
        }

        let user = await this.userRepository.findById(user_token.user_id);

        if(!user){
            throw new AppError("User does not exists.");
        }

        let compareDate = addHours(user_token.created_at, timeForExpireToken);
        
        if(isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired");
        }

        user.password = await hash(password, saltHash);

        await this.userRepository.save(user);
    }
}