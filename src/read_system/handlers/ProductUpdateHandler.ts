
import { AppDataSource } from "../data-source";
import { MessageBuffer } from "../messages/messageBuffer";
import Product from "../models/Product";
import { Logger } from "../logger";


export async function productUpdateHandler(product_buffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) {
    const logger = new Logger();
    logger.info("Starting Product updating");

    let product_data = await new MessageBuffer("product").decode(product_buffer);

    const logChild = logger.child(`Product ${product_data.id} updating`)
    logChild.info("Starting to update Product");

    let product = new Product()
    product.id = product_data["id"];
    product.name = product_data["name"];
    product.price = product_data["price"];
    await AppDataSource.manager.save(product);
    logChild.info("Saved product with id: " + product.id);
};