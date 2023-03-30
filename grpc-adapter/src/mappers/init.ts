const path = require('node:path');

import {Request} from '../grpc-adapter';
import {TodoService} from '../services/todoService';

const todoService = TodoService();

const protoName = path.join(__dirname, 'proto', 'todo.proto');
console.log(' --> protoName');
console.log(protoName);

export const mappers = [
    Request(protoName, {
        insert: todoService.insertTask,
        list: todoService.listTask,
        mark: todoService.markTask,
    }),
];
