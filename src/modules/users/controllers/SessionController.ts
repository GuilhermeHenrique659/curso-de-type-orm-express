import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";


export default class SessionController
{
    public async create(request:Request, response: Response): Promise<Response>
    {
        const {email, password} = request.body;

        const createUser = userServiceFactory.GetCreateSessionService();

        let user = await createUser.execute({
            email,
            password
        });

        return response.json(user)
    }
}