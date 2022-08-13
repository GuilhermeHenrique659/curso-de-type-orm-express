import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";
import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";

const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", isAuthenticated, userController.index);

usersRouter.post("/", celebrate(userValidate.CreateBodyIsValid()), userController.create);

export default usersRouter;