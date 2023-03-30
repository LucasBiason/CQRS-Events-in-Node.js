import { Router } from "express";
import { CartController } from "../controllers/CartController";

let routeBuilder = (path: any) => {
    const routes = Router();
    routes.get(`${path}/:cartid`, new CartController().query);
    return routes;
}

module.exports = routeBuilder;