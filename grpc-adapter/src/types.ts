export interface MapperType {
    [route: string]: any;
 }

export interface LoggerType {
    error: (message: any) => any;
    info: (message: any) => any;
}

export interface gRPCAdapterParams {
    Logger?: LoggerType;
    Mapper: MapperType;
}

