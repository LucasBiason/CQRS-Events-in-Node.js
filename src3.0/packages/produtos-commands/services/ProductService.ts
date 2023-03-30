import { AppDataSource } from "../data-source";
import { Logger } from "../logger";
import Product from "../models/Product";


export class ProductService{
    _logger: any;

    constructor() {
      this._logger = new Logger();
    }

    async update(body: any): Promise<Product|null|Error> {
        this._logger.info("Starting to update Product");
        let product = new Product()
        product.id = body["id"];
        product.name = body["name"];
        product.color = body["color"];
        product.active = body["active"];
        await AppDataSource.manager.save(product);
        this._logger.info("Saved product with id: " + product.id);
        return product;
    }

}