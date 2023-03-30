import {gRPCAdapterParams, MapperType} from './types';

require('dotenv').config();

const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
const PORT = parseInt(process.env.GRPCPORT != undefined ? process.env.GRPCPORT : '50051');

export function Request(filePath:string, callbackHandlers:any) {
    return {
        filePath, callbackHandlers,
    };
}

export function gRPCAdapter({Logger, Mapper}: gRPCAdapterParams) {
    const server = new grpc.Server();
    setupMapping(Mapper);

    function setupMapping(Mapper: MapperType) {
        Mapper.forEach((requestAdapter: any) => {
            const packageDefinition = protoLoader.loadSync(requestAdapter.filePath);
            const grpcObj = grpc.loadPackageDefinition(packageDefinition);
            server.addService(grpcObj.Service.service, requestAdapter.callbackHandlers);
        });
    }

    function startServer(port: number) {
        server.bindAsync(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure(),
            (error: any, port: any) => {
                console.log(`Server running at http://127.0.0.1:${port}`);
                server.start();
            });
    }

    return {
        listen() {
            return startServer(PORT);
        },
    };
}
