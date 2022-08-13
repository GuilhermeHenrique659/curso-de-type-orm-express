import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import authConfig from "@config/auth"

export default function isAuthenticated(
    request: Request, response: Response, nextFunction: NextFunction
): void{
    const authHeader = request.headers.authorization;

    if(! authHeader){
        throw new AppError("token is missing.")
    }

    const [, token] = authHeader.split(" ");

    try{
        const tokenDecode = verify(token, authConfig.jwt.secret);

        return nextFunction();
    } catch {
        throw new AppError("Token JWT is not valid")
    }

}