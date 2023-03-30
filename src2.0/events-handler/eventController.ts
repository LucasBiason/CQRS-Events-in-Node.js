import Pulsar from 'pulsar-client';
import { Logger } from "./logger";
import { FlowbuidClient } from './services/flowbuild';
import { MQTTClient } from "./services/mqtt";

require('dotenv/config')

const dispatch_table : { [route: string]: string[]; } = {
	"workflow_A": ["workflow_B", "workflow_C"]
}

const LISTENERS = {
  '/process/#': async (topic: any, payload: any) => {
    console.log(`> Payload ${topic} received. `)
    if (payload['processId'] == undefined) {
      console.log(payload)
      return undefined;
    }
    console.log(`> Process ID: '${payload['processId']}' `)
    console.log(`> Process Workflow Name: '${payload['workflow']}' `)
    const response = await FlowbuidClient().getProcessHistory(payload['processId']);
    console.log(`> Process status: '${response[0]['status']}' `)
    if (response[0]['status'] == 'finished') {
      const workflowNames = dispatch_table[payload['workflow']];
      if (workflowNames == undefined) {
        console.log(`> No workflow list for '${payload['workflow']}' `)
        return undefined;
      }
      workflowNames.forEach(async (workflowName: string) => {
        console.log(`> Starting Workflow: '${workflowName}' `)
        const responseCreateProcess = await FlowbuidClient().createProcess(workflowName);
        console.log(`> Response received: `)
        console.log(responseCreateProcess)
      });
    }
  }
}

export function Listener() {
  const logger = Logger();
  logger.info(">> Starting Listeners");

  if(process.env.LISTENER_URL==undefined){
    throw new Error("Param LISTENER_URL url not configured");
  }
  const serverUrl = process.env.LISTENER_URL;

  async function startListeners(){
    Object.entries(LISTENERS).forEach(
      async ([topic, callback]) => MQTTClient(serverUrl).startListen(topic, callback));
  };

  return {
    async start(fn?: Function) {
      await startListeners();
      if (fn){ fn() }
    }
  };

}
