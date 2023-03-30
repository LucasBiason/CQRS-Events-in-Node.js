import { AppDataSource } from "../data-source";
import { MessageBuffer } from "../messages/messageBuffer";
import Cart from "../models/Cart";
import { Logger } from "../logger";
import newrelic = require('newrelic');


export async function cartUpdateHandler(cart_buffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) {

    await newrelic.startBackgroundTransaction('CartUpdateHandler:update', 'Cart', async function() {
        let transaction = newrelic.getTransaction()
        console.log(transaction)

        const logger = new Logger();
        let proto_data = await new MessageBuffer("cart").decode(cart_buffer);
        let transaction_data = proto_data["transaction"];
        let cart_data = proto_data["cart"];

        transaction.acceptDistributedTraceHeaders('Other', transaction_data);

        const logChild = logger.child(`Cart ${cart_data.id} updating`)
        logChild.info("Starting to update Cart");

        let cart = new Cart()
        cart.id = cart_data["id"];
        cart.total = cart_data["total"];
        cart.products = cart_data["products"];
        await AppDataSource.manager.save(cart);
        logChild.info("Saved cart with success");

        transaction.end();
    });
};