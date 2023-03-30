import { Logger } from "./logger";
import Pulsar from 'pulsar-client';
const mqtt = require('mqtt');

require('dotenv/config')

const LISTENERS = {
  '/process/#': "FBProcess"
}

export class Listener{
  _logger: any;
  _serverUrl: string;

  constructor() {
    this._logger = new Logger();
    this._logger.info("Starting Listener");

    if(process.env.LISTENER_URL==undefined){
      this._logger.error("Param LISTENER_URL url not configured");
      throw new Error("Param LISTENER_URL url not configured");
    }
    this._serverUrl = process.env.LISTENER_URL;
  }

  async startListeners(){
    Object.entries(LISTENERS).forEach(
      async ([topic, eventKey]) => {
        this._logger.info(`Listener trying to connect to ${this._serverUrl} for ${topic} ...`);

        let client = mqtt.connect(this._serverUrl, {
            clientId: `writer_listener_${Math.random().toString(16).slice(3)}`
        });

        client.on('connect', () => {
            this._logger.info(`Listener connected to  ${this._serverUrl}`);
            this._logger.info(`> Creating Listener for topic: ${topic}`);
            client.subscribe([topic], () => {
              this._logger.info(`> Subscribed at topic '${topic}'`)
            })
        })

        client.on('message', (topicMsg: any, payload: any) => {
            this._logger.info(`> Received Message: '${topicMsg}' '${payload.toString()}'`)
            new Emitter().emit(eventKey, payload);
        })

    });
  }
}

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
        this._logger.info(`Sending message: ${messageToSend}`);
        await producer.send({data: Buffer.from(messageToSend),});
        this._logger.info(`Sent message: ${messageToSend}`);
        await producer.flush();
        await producer.close();
        await client.close();
    }
}
