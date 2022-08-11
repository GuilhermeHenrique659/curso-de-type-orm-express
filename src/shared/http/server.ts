import 'reflect-metadata'
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import routes from "./routes"
import AppError from "@shared/errors/AppError";
import '@shared/typeorm'


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

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

app.listen(3333, () => {
    console.log("Server start in port 3333!");
})