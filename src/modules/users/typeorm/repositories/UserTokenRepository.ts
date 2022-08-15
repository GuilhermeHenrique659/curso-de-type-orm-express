import { Like, Repository } from "typeorm";
import User from "../entities/users";
import UserToken from "../entities/userToken";
import IUserRepository from "./IUserRepository";
import IUserTokenRepository from "./IUserTokenRepository";

export default class UserTokenRepository implements IUserTokenRepository
{
    private ormRepository: Repository<UserToken>

    constructor (repository: Repository<UserToken>){
        this.ormRepository = repository;
    }

    public async findByToken(token: string): Promise<UserToken | null> {
        let userToken = await this.ormRepository.findOne({
            where: {
                token
            }
        });
        return userToken;
    }

    public async generate(user_id: any): Promise<UserToken | null> {
        let token = new UserToken(user_id);
        await this.ormRepository.save(token);

        return token
    }
    
}
