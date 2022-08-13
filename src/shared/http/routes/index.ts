import productRouter from "@modules/products/routes/product.route";
import sessionRouter from "@modules/users/routes/session.route";
import usersRouter from "@modules/users/routes/users.route";
import { Router } from "express"

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

export default routes;