import { Router } from "express"

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: "server is works" });
});

export default routes;