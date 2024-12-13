const { app, BrowserWindow, ipcMain, screen } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

// const crud = require('./todoCrud/basic');
// const readTodos = crud.readTodos;
// const createTodo = crud.createTodo;
const { pageContentArray } = require('./notion/basic');
const { log } = require('console');

const {readTodos, createTodo, deleteTodo} = require('./todoCrud/basic');

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Main Window'
  });
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadFile('index.html');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
  return mainWindow;

}

const createFloatingWindow = (currentTodo) => {
  const floatingWindow = new BrowserWindow({
    width: 200,
    height: 200,
    maximizable: false,     // doesn't work on linux
    minimizable: false,     // doesn't work on linux
    maxHeight: 2250,
    maxWidth: 2250,
    minHeight: 150,
    minWidth: 150,
    frame: false,
    fullscreenable: false,
    alwaysOnTop: true,
    movable: true,
    // resizable: false,
    transparent: true,
    // focusable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // floatingWindow.loadFile('floating.html');
  if (process.env.NODE_ENV === 'development') {
    floatingWindow.loadURL('http://localhost:3000/floating.html');
  }
  else {
    floatingWindow.loadFile('dist/floating.html');
  }
  floatingWindow.webContents.on('did-finish-load', () => {
    floatingWindow.webContents.send('todo:share', currentTodo);
  })
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createMainWindow();
  ipcMain.handle('ping', (event, currentTodo) => {
    BrowserWindow.getAllWindows()[0].close();
    createFloatingWindow(currentTodo);
  });

  ipcMain.handle('ding', () => {
    BrowserWindow.getAllWindows()[0].close();
    const wdw = createMainWindow();
    console.log(BrowserWindow.getAllWindows()[0].title);
    // BrowserWindow.getAllWindows()[0].maximize();
    wdw.setAlwaysOnTop(true);
    setTimeout(() => {
      wdw.setAlwaysOnTop(false);
    }, 100);
  })

  ipcMain.handle('todo:read', async () => {
    const todos = await readTodos();
    // console.log(todos);
    return todos;
  })

  ipcMain.handle('todo:create', async(event, todoContent) => {
    await createTodo(todoContent);
    console.log('Todo created');
  })

  ipcMain.handle('todo:delete', async(event, todoId) => {
    await deleteTodo(todoId);
    console.log('Todo deleted');
  })

  ipcMain.handle('notion:read', async() => {
    const contentArray = await pageContentArray();
    return contentArray;
  })

})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})