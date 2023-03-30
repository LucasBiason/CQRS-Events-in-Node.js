import Pulsar from 'pulsar-client';
import { Logger } from "./logger";
import { FlowbuidClient } from './services/flowbuild';
import { MQTTClient } from "./services/mqtt";

require('dotenv/config')

const dispatch_table : { [route: string]: string[]; } = {
	"workflow_A": ["workflow_B", "workflow_C"],

	"DisableProductAdapter": ["DisableProduct"], // Via Chamada: Ninguem
  "DisableProduct": ["DisableProductQuery"], // Via Chamada: DisableFromCarts
  // Via Chamada: DisableFromCarts -> DisableFromCart (x Numero de Carts que tem o produto)
  "DisableFromCart": ["DisableFromCartQuery"],

}

const LISTENERS = {
  '/process/#': async (topic: any, payload: any) => {
    console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ")
    console.log(`> Event ${topic} received... `)
    console.log(`> Process:'${payload['workflow']}' ('${payload['processId']}') - '${payload['status']}' `)

    if (payload['processId'] == undefined) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n")
      return undefined;
    }
    if (payload['status'] == 'finished') {

      const response = await FlowbuidClient().getProcessHistory(payload['processId']);
      console.log(`> Process actual Node ID: '${response[0]['node_id']}' `)
      console.log("> Process result: ")
      console.log(response[0]["result"])

      const workflowNames = dispatch_table[payload['workflow']];
      if (workflowNames == undefined) {
        console.log(`>>> No workflows to start for '${payload['workflow']}' `)
        return undefined;
      }
      workflowNames.forEach(async (workflowName: string) => {
        console.log(`>>> Starting Workflow: '${workflowName}' `)
        const responseCreateProcess = await FlowbuidClient().createProcess(workflowName, response[0]["result"]);
        console.log(responseCreateProcess)
      });
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n")
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
