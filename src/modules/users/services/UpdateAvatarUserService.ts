
import uploadConfig from "@config/upload"
import fs from "fs"
import AppError from "@shared/errors/AppError";
import path from "path";
import User from "../typeorm/entities/users";
import IUserRepository from "../typeorm/repositories/IUserRepository";

interface IResquestUpdateAvatar
{
    user_id: string;
    avatarFilename: string | undefined;
}

export default class UploadAvatarUserService
{
    private repository: IUserRepository;

    constructor(repository: IUserRepository){
        this.repository = repository;
    }

    async execute({ user_id, avatarFilename}: IResquestUpdateAvatar): Promise<User>
    {
        let user = await this.repository.findById(user_id);

        if(!user){
            throw new AppError("user not found.")
        }

        this.OldUserAvatarRemoveIfExists(user.avatar);

        user.avatar = avatarFilename;

        await this.repository.save(user);

        return user;
    }


    private async OldUserAvatarRemoveIfExists(userAvatar: string | undefined): Promise<void>{
        if (userAvatar){
            let userAvatarFilePath = path.join(uploadConfig.directory, userAvatar);
            let userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
    }
}