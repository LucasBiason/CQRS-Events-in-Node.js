
type QueryMapperType = {
    [route: string]: any;
 }

type LoggerType = {
    before: (ctx: KoaContext) => void;
    after: (ctx: KoaContext) => void;
    error: (ctx: KoaContext, error: any) => any;
    info: (message: any) => any;
}

type HttpAdapterParams = {
    Logger?: LoggerType;
    QueryMapper: QueryMapperType;
}

type KoaContext = {
    response: any;
    request: any;
    params: any;
    app: any;
    status: any;
    body: any;
}
