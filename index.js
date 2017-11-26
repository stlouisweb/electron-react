const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    backgroundColor: '#69bbff'
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('content:ready', (event) => {
  mainWindow.webContents.send('content:send', 'here is some content from the electron app');
});
