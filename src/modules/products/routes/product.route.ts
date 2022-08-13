import ProductController from "../controllers/ProductController";
import { serviceFactory } from "../services/ServiceFactory";
import { Router } from "express";
import validate from "../validations/ProductValidation";
import {  celebrate, Segments, Joi } from 'celebrate';

const productController = new ProductController();

const productRouter = Router();


productRouter.get("/", productController.index);
productRouter.get("/:id" , celebrate(validate.IdParansIsValid()), productController.show);
productRouter.post("/", celebrate(validate.CreateBodyIsValid()), productController.create);
productRouter.put("/:id", celebrate(validate.UpdateParansBodyIsValid()), productController.update);
productRouter.delete("/:id", celebrate(validate.IdParansIsValid()), productController.delete);

export default productRouter;