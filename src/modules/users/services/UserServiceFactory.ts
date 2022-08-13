import { connection } from "@shared/typeorm";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import UserRepository from "../typeorm/repositories/UserRepository";
import CreateUserService from "./CreateUserService";
import IUserServiceFactory from "./IUserServiceFactory";
import ListUserService from "./ListUserService";


class UserServiceFactory implements IUserServiceFactory
{
    private repository: IUserRepository;
    
    constructor (repository: IUserRepository) {
        this.repository = repository
    }

    GetCreateUserService(): CreateUserService {
        return new CreateUserService(this.repository);
    }

    GetListUserService(): ListUserService {
        return new ListUserService(this.repository);
    }
}

const userRepository = new UserRepository(connection.getRepository(User));
export const userServiceFactory = new UserServiceFactory(userRepository);
