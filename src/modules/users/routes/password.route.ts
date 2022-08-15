import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

const passwordRouter = Router();
const passwordController = new ForgotPasswordController()

passwordRouter.post("/forgot", celebrate(userValidate.ForgotBodyIsValid()), passwordController.create);

export default passwordRouter;