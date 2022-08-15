import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";

export default class ResetPasswordController
{
    public async create(request: Request, response: Response): Promise<Response>
    {
        let { password, token } = request.body;

        let ResetPasswordEmail = userServiceFactory.GetResetPasswordService();

        await ResetPasswordEmail.execute({ token , password})

        return response.status(204).json()
    }
}