import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

let routeBuilder = (path: any) => {
    const routes = Router();
    routes.put(`${path}`, new ProductsController().update);
    return routes;
}

module.exports = routeBuilder;