const electron = require('electron');
const Store = require('electron-store');
const redux = require('redux');
const { createStore } = redux;
const appStateReducer = require('./app/reducers');
const actions = require('./app/actions');

const { app, BrowserWindow, ipcMain } = electron;

const appState = new Store({}, 'AppState');
// initializes electron-store, by either reading from or
// creating the AppState.json file on the users file system.

const initialState = appState.store;
let store = createStore(appStateReducer, initialState);

let mainWindow;
let splash;
app.on('ready', () => {
  splash = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    backgroundColor: '#69bbff'
  });
  splash.loadURL(`file://${__dirname}/app/loading.html`);
  mainWindow = new BrowserWindow({
    backgroundColor: '#69bbff',
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  store.subscribe(() => {
    mainWindow.webContents.send('appState:changed', store.getState());
  });
});
app.on('before-quit', () => {
  console.log(store.getState());
  appState.store = store.getState();
});



ipcMain.on('mainWindow:ready', (event) => {
  mainWindow.webContents.send('appState:changed', store.getState());
});

ipcMain.on('app:ready', (event) => {
  mainWindow.show();
  splash.destroy();
});

ipcMain.on('text:update', (event, text) => {
  store.dispatch(actions.updateText(text));
});
