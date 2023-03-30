export type Proto = {
    typeProto: string;
    fileToLoad: string;
}

type ProtoList = {
    [key: string]: Proto
}

export const registredProtos: ProtoList = {
    'cart': { typeProto: 'CartEnvelop', fileToLoad: '../../events/cartenvelop.proto' },
    'product': { typeProto: 'Product', fileToLoad: '../../events/product.proto' }
}