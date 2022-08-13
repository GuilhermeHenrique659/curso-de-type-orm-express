import User from "../typeorm/entities/users";

export default interface IResponseUser
{
    user: User;
    token: string
}