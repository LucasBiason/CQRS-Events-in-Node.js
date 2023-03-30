import { Router } from "express";
import { CartController } from "../controllers/CartController";

let routeBuilder = (path: any) => {
    const routes = Router();
    routes.post(`${path}/:cartid/product/:productid`, new CartController().addItem);
    routes.delete(`${path}/:cartid/product/:productid`, new CartController().removeItem);
    routes.post(`${path}/:cartid/checkout`, new CartController().checkout);
    return routes;
}

module.exports = routeBuilder;