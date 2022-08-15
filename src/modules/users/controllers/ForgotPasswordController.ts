import { Request, Response } from "express";
import { userServiceFactory } from "../services/UserServiceFactory";

export default class ForgotPasswordController
{
    public async create(request: Request, response: Response): Promise<Response>
    {
        let { email } = request.body;

        let sendForgotPasswordEmail = userServiceFactory.GetSendForgotPasswordEmailService();

        await sendForgotPasswordEmail.execute(email);

        return response.status(204).json()
    }
}