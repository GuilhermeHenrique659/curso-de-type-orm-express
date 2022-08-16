import { Router } from "express";
import {  celebrate, Segments, Joi } from 'celebrate';
import CustomerController from "../controllers/CustomersController";
import { customerRequestValidate } from "../validation/CustomerRequestValidation";

const customerController = new CustomerController();

const customerRouter = Router();


customerRouter.get("/", customerController.index);
customerRouter.get("/:id" , celebrate(customerRequestValidate.IdParansIsValid()), customerController.show);
customerRouter.post("/", celebrate(customerRequestValidate.CreateBodyIsValid()), customerController.create);
customerRouter.put("/:id", celebrate(customerRequestValidate.UpdateParansBodyIsValid()), customerController.update);
customerRouter.delete("/:id", celebrate(customerRequestValidate.IdParansIsValid()), customerController.delete);

export default customerRouter;