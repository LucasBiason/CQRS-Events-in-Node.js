import { Request, Response } from "express";
import { CartService } from "../services/CartService";


export class CartController{

    async query(request: Request, response: Response){
        const {cartid} = request.params;
        const service = new CartService();
        const result = await service.query(cartid);
        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result)
    }

}