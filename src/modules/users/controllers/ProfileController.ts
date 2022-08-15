import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";

export default class ProfileController
{
    public async show(request: Request, response: Response): Promise<Response>
    {
        let showProfile = userServiceFactory.GetShowUserProfileService();
        let id = request.user.id;

        let user = await showProfile.execute({ id })
        
        return response.json(user);
    }
    public async update(request: Request, response: Response): Promise<Response>
    {
        let updateProfile = userServiceFactory.GetUpdateProfileService();
        let  id = request.user.id;
        let { name, email, password , old_password} = request.body;

        let user = await updateProfile.execute({
            id,
            name,
            email,
            password,
            old_password,
        });

        return response.json(user)
    }
}