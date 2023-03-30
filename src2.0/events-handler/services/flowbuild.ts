import { Logger } from "../logger";
const axios = require('axios').default;

require('dotenv/config')

const logger = Logger();
const URL_BASE = process.env.FLOWBUILD_API_URL;

export function FlowbuidClient (){

    async function _getToken(){
        const url = `${URL_BASE}/token`;
        let token = '';
        logger.info(`Requesting ${url}`)
        await axios.post(url)
        .then(function (response: any) {
            logger.info(`>> Requested token at ${url}`);
            token = response['data']['jwtToken'];
        }).catch(function (error: any) {
            logger.info(` >> Error at ${url}`);
            logger.info(error);
        });
        return token;
    }

    async function _getProcessHistory(processId:string): Promise<any>{
        const url = `/processes/${processId}/history`;
        const token = await _getToken();

        let responseProcess = {};
        const instance = axios.create({
            baseURL: URL_BASE,
            timeout: 1000,
            headers: {'Authorization': `Bearer ${token}`}
        });
        logger.info(`Requesting ${URL_BASE}${url}`)
        await instance.get(url).then(function (response: any) {
            logger.info(` >> Requested ${URL_BASE}${url}`);
            responseProcess = response['data']
        }).catch(function (error: any) {
            logger.info(` >> Error at ${URL_BASE}${url}`);
            logger.info(error);
        });
        return responseProcess;
    }

    async function _createProcess(workflowName:string): Promise<any>{
        const url = `/workflows/name/${workflowName}/start`;
        const token = await _getToken();

        let responseProcess = {};
        var config = {
            method: 'post',
            url: `${URL_BASE}${url}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        };
        logger.info(`Requesting ${URL_BASE}${url}`);
        await axios(config).then(function (response: any) {
            logger.info(` >> Requested ${URL_BASE}${url}`);
            responseProcess = response['data']
        }).catch(function (error: any) {
            logger.info(` >> Error at ${URL_BASE}${url}`);
            logger.info(error);
        });
        return responseProcess;
    }

    return {
        async getProcessHistory(processId:string){
            return _getProcessHistory(processId);
        },
        async createProcess(workflowName:string){
            return _createProcess(workflowName);
        }
    }


}