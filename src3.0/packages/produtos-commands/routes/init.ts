import { Router } from "express";
const product = require('./product');

const routes = Router();
routes.use(product('/products'))

export { routes };