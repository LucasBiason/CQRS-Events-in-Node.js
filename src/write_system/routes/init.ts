import { Router } from "express";
const cart = require('./cart');

const routes = Router();
routes.use(cart('/cart'))

export { routes };