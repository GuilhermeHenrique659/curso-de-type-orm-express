import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";

const sessionRouter = Router();
const sessionController = new SessionController()

sessionRouter.post("/", celebrate(userValidate.SessionCreateBodyIsValid()), sessionController.create);

export default sessionRouter;