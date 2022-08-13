import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";

export default class UserController
{
    public async index(request: Request, response: Response): Promise<Response>
    {
        let listUser = userServiceFactory.GetListUserService()

        let users = await listUser.execute()

        return response.json(users);
    }
    public async create(request: Request, response: Response): Promise<Response>
    {
        let {name, email, password} = request.body;

        let createUser = userServiceFactory.GetCreateUserService();

        let user = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    }
}