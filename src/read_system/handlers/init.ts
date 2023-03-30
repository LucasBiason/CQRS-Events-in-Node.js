import { subscribersList } from "./subscribers";
import express = require("express");
import "reflect-metadata";
import { Logger } from "../logger";
let newrelic = require('newrelic');
newrelic.instrument({
    moduleName: 'my-module',
    onError: function myErrorHandler(err: { message: any; stack: any; }) {
        // Uh oh! Our instrumentation failed, lets see why:
        console.error(err.message, err.stack)

        // Let's kill the application when debugging so we don't miss it.
        process.exit(-1)
      }
  })

require('dotenv/config')

export class MessagesHandlers{
    private _logger: any;
    private _serverUrl: string;
    private _maxRetry: number;
    private _maxRetryWait: number;

    constructor() {
      this._logger = new Logger();
      this._logger.info("Starting Handlers");

      if(process.env.EMITTER_URL==undefined){
        this._logger.error("Param EMITTER_URL url not configured");
        throw new Error("Param EMITTER_URL url not configured");
      }
      this._serverUrl = process.env.EMITTER_URL;
      this._logger.info(`Pulsar URL is ${this._serverUrl}`);

      if(process.env.EMITTER_MAX_RETRY_WAIT==undefined){
        this._maxRetryWait = 10000;
      } else {
        this._maxRetryWait = parseInt(process.env.EMITTER_MAX_RETRY_WAIT);
      }

      if(process.env.EMITTER_MAX_RETRY==undefined){
        this._maxRetry = 20;
      } else {
        this._maxRetry = parseInt(process.env.EMITTER_MAX_RETRY);
      }

    }

    async _startClient(retried=0): Promise<any>{
        try{
            const Pulsar = require('pulsar-client');
            return new Pulsar.Client({ serviceUrl: this._serverUrl, });
        } catch(except){
            retried += 1
            this._logger.error(`Handler fail to connected at ${this._serverUrl}, retring ... (${retried}/${this._maxRetry})`);
            if (retried!=this._maxRetry) {
                return setTimeout(
                    () => this._startClient(retried), this._maxRetryWait
                );
            }
            this._logger.error(`Handler fail to connected at ${this._serverUrl}, max retry reached`);
            return undefined;
        }
    }

    async start(){
        const client = await this._startClient();
        if(client==undefined){
            this._logger.error("No connection for client");
            return undefined;
        }
        this._logger.info("Client connected");

        Object.entries(subscribersList).forEach(
            async ([topic, callback]) => {
                this._logger.info(`> Creating Handler for topic: ${topic}`);
                client.subscribe({
                    topic: topic,
                    subscription: 'subscription'+topic,
                    subscriptionType: 'Shared',
                    ackTimeoutMs: 10000,
                    listener: (msg: { getData: () => any; }, msgConsumer: { acknowledge: (arg0: any) => void; }) => {
                        this._logger.info(`Received message from ${this._serverUrl} at ${topic} channel`);
                        callback(msg.getData());
                        msgConsumer.acknowledge(msg);
                    },
                });
            }
        );

    }

}

export async function startMessagesHandlers(){
    new MessagesHandlers().start()
}