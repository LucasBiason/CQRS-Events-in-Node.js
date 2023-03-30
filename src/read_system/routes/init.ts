import { Router } from "express";
const cart = require('./cart');
const product = require('./product');

const routes = Router();
routes.use(cart('/cart'))
routes.use(product('/products'))

export { routes };