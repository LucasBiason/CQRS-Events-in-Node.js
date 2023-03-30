import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

let routeBuilder = (path: any) => {
    const routes = Router();
    routes.get(`${path}`, new ProductsController().query);
    return routes;
}

module.exports = routeBuilder;