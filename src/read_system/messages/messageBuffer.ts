const protobuf = require('protobufjs');
import { Proto, registredProtos } from "./typeBuffers";
import { Logger } from "../logger";


export class MessageBuffer{
    _logger: any;
    _proto: Proto;

    constructor(typeBuffer: string) {
      this._logger = new Logger();
      this._logger.info("Starting MessageBuffer with type " + typeBuffer);
      this._proto = registredProtos[typeBuffer];
    }

    async load(){
        this._logger.info("Loading Protobuf with type " + this._proto.typeProto);
        const protoLoaded = await protobuf.load(this._proto.fileToLoad);
        return protoLoaded.lookupType(this._proto.typeProto);
    }

    async decode(message: any){
      const protoLoaded = await this.load();
      return protoLoaded.decode(Buffer.from(message));
    }

}