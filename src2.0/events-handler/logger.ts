const nrFormat = require('@newrelic/pino-enricher')
const pino = require('pino')

export function Logger() {

  const logger = pino(nrFormat());

  return {
    error(msg: string | undefined){
      logger.error({ err: new Error(msg) }, msg)
    },

    info(msg: string | undefined){
      logger.info(msg)
    }
  };

};