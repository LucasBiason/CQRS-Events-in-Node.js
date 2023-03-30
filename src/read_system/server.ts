import { AppDataSource } from "./data-source"
import express = require("express");
import "reflect-metadata";
import {routes} from "./routes/init"
import { Logger } from "./logger";
import newrelic = require('newrelic');

require('dotenv/config')

const app = express();
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT, () => {
    let logger = new Logger();
    logger.info(`Server ${process.env.APP_NAME} running at port ${process.env.PORT}`);
    AppDataSource.initialize().then(() => {
        logger.info("Database connected and sync");
    }).catch(error => logger.error(error));
});
