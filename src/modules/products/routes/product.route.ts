import ProductController from "../controllers/ProductController";
import { Router } from "express";
import serviceFactory from "../services/ServiceFactory";


console.log(serviceFactory.ShowProductService().execute(1))
const productController = new ProductController(serviceFactory);


const productRouter = Router();

productRouter.get("/", productController.index);
productRouter.get("/:id", productController.show);
productRouter.post("/", productController.create);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);

export default productRouter;