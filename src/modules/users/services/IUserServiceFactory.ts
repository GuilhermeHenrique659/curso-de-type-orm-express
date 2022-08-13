import User from "../typeorm/entities/users";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import ListUserService from "./ListUserService";

export default interface IUserServiceFactory
{
    GetCreateUserService(): CreateUserService;
    GetListUserService(): ListUserService;
    GetCreateSessionService(): CreateSessionService;
}