

export function TodoService() {
    const fakeDB = [
        {id: 1, done: false, task: 'Task 01'},
        {id: 2, done: false, task: 'Task 02'},
    ];

    function changeData(id: number, checked: boolean, task?: string) {
        if (!task) task = 'not  found.';
        let res = {id: id, done: false, task: task};
        for (let i =0; i<fakeDB.length; i++) {
            if (fakeDB[i].id == id) {
                fakeDB[i].done = checked;
                res = fakeDB[i];
            }
        }
        return res;
    }

    return {
        insertTask(message: any, callback: any) {
            const todo = message.request;
            const data = changeData(fakeDB.length=1, false, todo.task);
            if (todo.task) fakeDB.push(data);
            callback(null, data);
        },
        listTask(_: any, callback: any) {
            callback(null, fakeDB);
        },
        markTask(message: any, callback: any) {
            const item = message.request;
            callback(null, changeData(item.id, item.checked));
        },
    };
}

