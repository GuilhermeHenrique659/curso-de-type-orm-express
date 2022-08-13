import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import authConfig from "@config/auth"

interface ITokenPayload 
{
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request, response: Response, nextFunction: NextFunction
): void{
    const authHeader = request.headers.authorization;

    if(! authHeader){
        throw new AppError("token is missing.")
    }

    const [, token] = authHeader.split(" ");

    try{
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        }

        return nextFunction();
    } catch {
        throw new AppError("Token JWT is not valid")
    }

}