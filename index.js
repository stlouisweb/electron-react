const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('content:ready', (event) => {
  mainWindow.webContents.send('content:send', 'here some content');
});
