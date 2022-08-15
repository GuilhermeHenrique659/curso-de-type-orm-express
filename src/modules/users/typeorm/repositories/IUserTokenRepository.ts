import UserToken from "../entities/userToken";

export default interface IUserTokenRepository
{
    findByToken(token: string): Promise<UserToken | null>;
    generate(user_id: any): Promise<UserToken | null>
}