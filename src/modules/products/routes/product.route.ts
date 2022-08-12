import ProductController from "../controllers/ProductController";
import { serviceFactory } from "../services/ServiceFactory";
import { Router } from "express";

const productController = new ProductController(serviceFactory);

const productRouter = Router();

productRouter.get("/", productController.index);
productRouter.get("/:id", productController.show);
productRouter.post("/", productController.create);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);

export default productRouter;