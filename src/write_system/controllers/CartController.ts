import { Request, Response } from "express";
import { CartService } from "../services/CartService";
import newrelic = require('newrelic');

export class CartController{

    async addItem(request: Request, response: Response){
        let result: any = null;

        const { cartid, productid } = request.params;
        const { price, quantity } = request.body;

        await newrelic.startBackgroundTransaction('CartController:addItem', 'Cart', async function () {
            let btransaction = newrelic.getTransaction();
            result = await new CartService(btransaction).addItem(cartid, productid, price, quantity);
            btransaction.end();
        });

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result)
    }

    async checkout(request: Request, response: Response){
        const {cartid} = request.params;
        const service = new CartService();
        const result = await service.checkout(cartid);
        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result)
    }

    async removeItem(request: Request, response: Response){
        const {cartid, productid} = request.params;
        const service = new CartService();
        const result = await service.removeItem(cartid, productid);
        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result)
    }
}