const electron = require('electron');
const Store = require('electron-store');

const { app, BrowserWindow, ipcMain } = electron;
const appState = new Store({}, 'AppState');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#69bbff'
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('close', () => {
    mainWindow.webContents.send('appState:fetch', '');
  });
});

ipcMain.on('mainWindow:ready', (event) => {
  mainWindow.webContents.send('appState:send', appState.store);
});



ipcMain.on('appState:recieved', (event, state) => {
  appState.store = state;
});
