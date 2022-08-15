import { Router } from "express";
import { celebrate } from "celebrate"
import { userValidate } from "../validations/UserValidation";
import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.show);
profileRouter.put("/", celebrate(userValidate.UploadBodyIsvalid()) ,profileController.update)


export default profileRouter;