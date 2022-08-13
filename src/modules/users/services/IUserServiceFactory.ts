import CreateUserService from "./CreateUserService";
import ListUserService from "./ListUserService";

export default interface IUserServiceFactory
{
    GetCreateUserService(): CreateUserService;
    GetListUserService(): ListUserService;
}