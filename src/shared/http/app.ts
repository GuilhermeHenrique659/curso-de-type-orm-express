import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import routes from "./routes"
import AppError from "@shared/errors/AppError";
import {  errors } from 'celebrate';
import uploadConfig from "@config/upload"
import rateLImiter from "./middlewares/rateLimiter";

const app = express();
app.use(cors());
app.use(express.json());

app.use(rateLImiter)

app.use("/files", express.static(uploadConfig.directory) )
app.use(routes);

app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    const serverStatusError = 500;
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    return response.status(serverStatusError).json({
        status: "error",
        message: "internal server error!"
    })
});

export default app