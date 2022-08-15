import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const ForgotController = new ForgotPasswordController()
const ResetController = new ResetPasswordController();

passwordRouter.post("/forgot", celebrate(userValidate.ForgotBodyIsValid()), ForgotController.create);

passwordRouter.post("/reset", celebrate(userValidate.ResetBodyIsValid()), ResetController.create)

export default passwordRouter;