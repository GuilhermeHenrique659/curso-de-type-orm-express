import productRouter from "@modules/products/routes/product.route";
import { Router } from "express"

const routes = Router();

routes.use("/products", productRouter);


export default routes;