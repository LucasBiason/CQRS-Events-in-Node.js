import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";


export class ProductsController{

    async query(request: Request, response: Response){
        const service = new ProductService();
        const result = await service.query();
        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        return response.json(result)
    }

}