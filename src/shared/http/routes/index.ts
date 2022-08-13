import productRouter from "@modules/products/routes/product.route";
import usersRouter from "@modules/users/routes/users.route";
import { Router } from "express"

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", usersRouter);

export default routes;