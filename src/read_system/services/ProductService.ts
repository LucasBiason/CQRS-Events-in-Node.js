import { AppDataSource } from "../data-source"
import Product from "../models/Product";
import { Logger } from "../logger";


export class ProductService {
    async query() {
        const logger = new Logger();
        logger.info(`Requesting Products`);
        return AppDataSource.getRepository(Product)
        .createQueryBuilder("product")
        .getMany();
    }
}