import productRouter from "@modules/products/routes/product.route";
import passwordRouter from "@modules/users/routes/password.route";
import sessionRouter from "@modules/users/routes/session.route";
import usersRouter from "@modules/users/routes/users.route";
import { Router } from "express"

const routes = Router();

routes.use("/products", productRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);
routes.use("/password", passwordRouter);

export default routes;