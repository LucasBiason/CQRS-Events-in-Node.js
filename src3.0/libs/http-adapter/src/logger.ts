//const nrFormat = require('@newrelic/pino-enricher')
const pino = require('pino')
const logger = pino() //pino(nrFormat())

export const DefaultLogger: LoggerType = {

    before(ctx: KoaContext) {
      ctx.request.receivedAt = Date.now();
      logger.info(`>> ${ctx.request.method} ${ ctx.request.href}`);
      return ctx;
    },

    after(ctx: KoaContext) {
      const elapsed = Date.now() - ctx.request.receivedAt;
      logger.info(`<< ${ctx.request.method} ${ ctx.request.href} ${ctx.response.status} ${elapsed} ms`);
      return ctx;
    },

    error(ctx: KoaContext, error: any){
        logger.error({ err: new Error(error.message) }, error.message)
        ctx.status = 500;
        ctx.body = {
            message: error.message
        };
        ctx.app.emit('error', error, ctx);
        return ctx;
    },

    info(message: any){
        logger.info(message);
    }

  };