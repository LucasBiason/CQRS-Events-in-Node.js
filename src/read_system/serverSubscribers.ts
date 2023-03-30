import express = require("express");
import { startMessagesHandlers } from "./handlers/init";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Logger } from "./logger";

require('newrelic');
require('dotenv/config')

const app = express();
app.listen(3012, () => {
    let logger = new Logger();
    logger.info(`Starting subscribers for ${process.env.APP_NAME}`);
    AppDataSource.initialize().then(() => {
        logger.info("Database connected and sync");
        startMessagesHandlers();
    }).catch((error: any) => logger.error(error));
});