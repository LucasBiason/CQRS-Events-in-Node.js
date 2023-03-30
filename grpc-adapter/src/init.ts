import {gRPCAdapter} from './grpc-adapter';
import {mappers} from './mappers/init';

export const _server = gRPCAdapter({
    Mapper: mappers,
}).listen();
