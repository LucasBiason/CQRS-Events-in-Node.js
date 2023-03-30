import { AppDataSource } from "./data-source";
import { MessageBuffer } from "./messages/messageBuffer";
import { Emitter } from "./events/eventEmitter";
import Cart from "./models/Cart";
import Product from "./models/Product";
import { Logger } from "./logger";


export function initTestDatabase() {
    const logger = new Logger();

    logger.info("Inserting a new products for test into the database...")
    let productsToInsert = [
        { "id": "8857191f-5662-4cda-a559-b7b6c0ec471f", "name": "iPhone 9", "price": 579},
        { "id": "88755374-9d55-44fd-8bf5-076b3d14a2b4", "name": "iPhone X", "price": 899},
        { "id": "5c890310-fa4a-43fb-b6c5-97a3d38955b2", "name": "Samsung Universe 9", "price": 1249},
        { "id": "2c6b8fd1-851a-4618-9eaa-b28c826ba204", "name": "Huawei P30", "price": 499},
        { "id": "b1bcdeff-5168-4016-b2d0-264e2675f6bc", "name": "XPTO 456", "price": 1299}
    ]
    productsToInsert.forEach(async (product_data) => {
        let product = new Product()
        product.id = product_data["id"];
        product.name = product_data["name"];
        product.price = product_data["price"];
        await AppDataSource.manager.save(product);
        logger.info("Saved a new product test with id: " + product.id);
        const objectDataBuffer = await new MessageBuffer("product").load();
        await new Emitter().emit("ProductUpdateEvent", objectDataBuffer.encode(product_data).finish());
    });

    logger.info("Inserting a new carts for test into the database...");
    let cartsToInsert = [
        {"id":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed","total": 4}
    ]
    cartsToInsert.forEach(async (cart_data) => {
        let cart = new Cart()
        cart.id = cart_data["id"];
        cart.total = cart_data["total"];
        await AppDataSource.manager.save(cart);
        logger.info("Saved a new cart test with id: " + cart_data.id);
        const objectDataBuffer = await new MessageBuffer("cart").load();
        await new Emitter().emit("CartUpdateEvent", objectDataBuffer.encode(cart.toJSON()).finish());
    });
}