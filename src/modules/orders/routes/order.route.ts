import { Router } from "express";
import {  celebrate, Segments, Joi } from 'celebrate';
import OrderController from "../controllers/OrderController";
import { orderRequestValidate } from "../validation/orderRequestValidation";
import isAuthenticated from "@shared/http/middlewares/IsAuthenticated";

const order_controller = new OrderController();

const orderRoutes = Router();

orderRoutes.use(isAuthenticated);

orderRoutes.get('/:id', celebrate(orderRequestValidate.IdParansIsValid()), order_controller.show);

orderRoutes.post('/', celebrate(orderRequestValidate.CreateBodyIsValid()), order_controller.create)


export default orderRoutes;