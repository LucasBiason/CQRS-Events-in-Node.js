import { Logger } from "../logger";
const mqtt = require('mqtt');


export function MQTTClient (serverUrl: string){
    const logger = Logger();
    logger.info("> Starting MQTTClient");

    function startListen(topic: string, fn?: Function){
        logger.info(`> Starting MQTTClient for topic ${topic}`);

        let client = mqtt.connect(serverUrl, {
            clientId: `listener_${Math.random().toString(16).slice(3)}`
        });

        client.on('connect', () => {
            logger.info(`> Listener connected to  ${serverUrl}`);
            logger.info(`> Creating Listener for topic: ${topic}`);
            client.subscribe([topic], () => {
              logger.info(`> Subscribed at topic '${topic}'`)
            })
        })

        client.on('message', (topicMsg: any, payload: any) => {
            logger.info(`> Received Message: '${topicMsg}' \n'${payload.toString()}'`)
            if (fn) return fn(topicMsg,  JSON.parse(payload.toString()) );
        });
    }

    return {
        async startListen(topic: string, fn?: Function) {
            return startListen(topic, fn);
        }
    };
}