import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate } from "celebrate"
import uploadConfig from "@config/upload"
import { userValidate } from "../validations/UserValidation";
import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";
import multer from "multer";

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, userController.index);

usersRouter.post("/", celebrate(userValidate.CreateBodyIsValid()), userController.create);

usersRouter.patch("/avatar", isAuthenticated, upload.single("avatar") ,userAvatarController.update);

export default usersRouter;