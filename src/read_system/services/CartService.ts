import { AppDataSource } from "../data-source"
import Cart from "../models/Cart";
import { Logger } from "../logger";

export class CartService{

    async query(cartid: string) {
        const logger = new Logger();
        logger.info(`Requesting Cart ${cartid}`);
        return AppDataSource.getRepository(Cart)
        .createQueryBuilder("cart")
        .where("id = :id", {id: cartid})
        .getMany();
    }

}