import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import { compare, hash } from "bcryptjs"

interface IRequest{
    id: string;
    email: string;
    name: string;
    password?: string;
    old_password: string;
}

export default class UpdateProfileService
{
    private userRepository: IUserRepository;

    constructor (repository: IUserRepository){
        this.userRepository = repository;
    }

    private async PasswordConfirmWithOldPassword(password: string, old_password: string): Promise<void>
    {
        let passwordConfirm = await compare(old_password, password);

        if(!passwordConfirm){
            throw new AppError("Password incorrect", 401)
        }

    }

    private async PasswordCrypt(user:IRequest): Promise<string>
    {
        const saltLeght = 8;
        if(user.password){
            return await hash(user.password, saltLeght);
        }else{
            return await hash(user.old_password, saltLeght);;
        }
    }

    public async execute(userData: IRequest): Promise<User>
    {
        let {id, name, email, password, old_password} = userData;
        let userExists = await this.userRepository.findById(id);

        if(!userExists){
            throw new AppError("User not found.");
        }

        let userEmailAvailable = await this.userRepository.findByEmail(email);

        if(userEmailAvailable && userEmailAvailable.id !== id){
            throw new AppError("Email already used");
        }

        await this.PasswordConfirmWithOldPassword(userExists.password, old_password)

        password = await this.PasswordCrypt(userData);

        let user = new User(name, email, password, id);
        console.log(user.id);
              
        await this.userRepository.save(user);

        return user;
    }
}