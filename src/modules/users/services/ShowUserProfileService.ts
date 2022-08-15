import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";

interface IRequest{
    id: string
}

export default class ShowUserProfileService
{
    private userRepository: IUserRepository;

    constructor (repository: IUserRepository){
        this.userRepository = repository;
    }

    public async execute({ id }: IRequest): Promise<User>
    {
        let user = await this.userRepository.findById(id);

        if(!user){
            throw new AppError("User not found.");
        }

        return user;
    }
}