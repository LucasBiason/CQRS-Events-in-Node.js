import { DefaultLogger } from "./logger";
import Router from 'koa-router';
const json = require('koa-json')

const Koa = require('koa');

export function HttpAdapter({ Logger, QueryMapper }: HttpAdapterParams) {
    const app = new Koa();
    app.use(json())

    setupLogger(Logger ? Logger: DefaultLogger);
    setupMapping(QueryMapper);

    function setupLogger(logger: LoggerType) {
        app.use(async (ctx: KoaContext, next: () => Promise<any>) => {
            try {
                logger.before(ctx);
                await next();
                logger.after(ctx);
            } catch (error) {
                logger.error(ctx, error);
            }
        });
    }

    function setupMapping(queryMapper: QueryMapperType) {
        let router = new Router();
        Object.entries(queryMapper).forEach(([route, callable]) => {
            router.get(route, async (ctx: any, next: () => Promise<any>) => {
                return ctx.body = await callable({
                    params: ctx.params,
                    body: ctx.request.json,
                    ctx,
                });
            });
        });
        app.use(router.routes())
    }

    function startServer(port: number, logger: LoggerType, fn: Function){
        app.listen(port, () => {
            logger.info(`Server running at port ${port}`);
            fn();
        });
    }

    return {
      listen(port: number, fn?: Function) {
        startServer(port, Logger ? Logger: DefaultLogger, fn ? fn : () => {});
      },
    };
  }