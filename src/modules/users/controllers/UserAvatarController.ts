import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";


export default class UserAvatarController
{
    public async update(request:Request, response: Response): Promise<Response>
    {
        const updateAvatar = userServiceFactory.GetUploadAvatarUserService();

        const user = updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file?.filename
        });

        return response.json(user);
    }
}