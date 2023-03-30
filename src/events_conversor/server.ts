import { Listener } from "./eventController";
import express = require("express");
import "reflect-metadata";
import { Logger } from "./logger";

require('newrelic');
require('dotenv/config')

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
    let logger = new Logger();
    logger.info(`Server ${process.env.APP_NAME} running at port ${process.env.PORT}`);
    new Listener().startListeners()
});

