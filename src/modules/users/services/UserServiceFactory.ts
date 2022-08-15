import { connection } from "@shared/typeorm";
import User from "../typeorm/entities/users";
import UserToken from "../typeorm/entities/userToken";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IUserTokenRepository from "../typeorm/repositories/IUserTokenRepository";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import IUserServiceFactory from "./IUserServiceFactory";
import ListUserService from "./ListUserService";
import ResetPasswordService from "./ResetPasswordService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import UpdateAvatarUserService from "./UpdateAvatarUserService";


class UserServiceFactory implements IUserServiceFactory
{
    private userRepository: IUserRepository;

    private tokenRepository: IUserTokenRepository;
    
    constructor (userRepository: IUserRepository, tokenRepository: IUserTokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public GetCreateUserService(): CreateUserService {
        return new CreateUserService(this.userRepository);
    }

    public GetListUserService(): ListUserService {
        return new ListUserService(this.userRepository);
    }
    public GetCreateSessionService(): CreateSessionService {
        return new CreateSessionService(this.userRepository);
    }
    public GetUploadAvatarUserService(): UpdateAvatarUserService {
        return new UpdateAvatarUserService(this.userRepository);
    }
    public GetResetPasswordService(): ResetPasswordService {
        return new ResetPasswordService(this.userRepository, this.tokenRepository);
    }
    public GetSendForgotPasswordEmailService(): SendForgotPasswordEmailService {
        return new SendForgotPasswordEmailService(this.userRepository, this.tokenRepository);
    }
}

const userRepository = new UserRepository(connection.getRepository(User));
const tokenRepository = new UserTokenRepository(connection.getRepository(UserToken));
export const userServiceFactory = new UserServiceFactory(userRepository, tokenRepository);
