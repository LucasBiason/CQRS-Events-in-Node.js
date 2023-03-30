import { Logger } from "../logger";
import Pulsar from 'pulsar-client';

require('dotenv/config')

export class Emitter{
    _logger: any;
    _serverUrl: string;

    constructor() {
      this._logger = new Logger();
      this._logger.info("Starting Emitter");

      if(process.env.EMITTER_URL==undefined){
        this._logger.error("Param EMITTER_URL url not configured");
        throw new Error("Param EMITTER_URL url not configured");
      }
      this._serverUrl = process.env.EMITTER_URL;
    }

    async emit(eventFactory: string, messageToSend: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>){
        this._logger.info(`Emiting... ${eventFactory} at ${this._serverUrl}`);
        const client = new Pulsar.Client({serviceUrl: this._serverUrl,});
        const producer = await client.createProducer({topic: eventFactory,});
        await producer.send({data: Buffer.from(messageToSend),});
        this._logger.info(`Sent message: ${messageToSend}`);
        await producer.flush();
        await producer.close();
        await client.close();
    }
}
