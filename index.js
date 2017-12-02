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

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#69bbff'
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

ipcMain.on('text:update', (event, text) => {
  store.dispatch(actions.updateText(text));
});
