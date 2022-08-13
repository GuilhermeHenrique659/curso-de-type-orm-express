import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";

const usersRouter = Router();
const userController = new UserController();

usersRouter.get("/", userController.index);

usersRouter.post("/", celebrate(userValidate.CreateBodyIsValid()), userController.create);

export default usersRouter;