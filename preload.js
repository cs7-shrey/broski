const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    foo: 'bar', 
    ping: (currentTodo) => ipcRenderer.invoke('ping', currentTodo),
    ding: () => ipcRenderer.invoke('ding'),

    readTodos: async () => {
        const data = await ipcRenderer.invoke('todo:read');
        return data;
    },
    createTodo: (content) => ipcRenderer.invoke('todo:create', content), 
    deleteTodo: async (todoId) => ipcRenderer.invoke('todo:delete', todoId),
    readNotion: async () => {
        console.log('context bridge invoked');
        const data = await ipcRenderer.invoke('notion:read');
        return data;
    },
    getCurrentTodo: (callback) => ipcRenderer.on('todo:share', (event, currentTodo) => callback(currentTodo))
})

