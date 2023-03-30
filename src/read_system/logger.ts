const nrFormat = require('@newrelic/pino-enricher')
const pino = require('pino')

export class Logger{
  _logger: any;

  constructor() {
    this._logger = pino(nrFormat());
  }

  error(msg: string | undefined){
    this._logger.error({ err: new Error(msg) }, msg)
  }

  info(msg: string | undefined){
    this._logger.info(msg)
  }

  child(module: string | undefined){
    return this._logger.child({module: module})
  }

}
