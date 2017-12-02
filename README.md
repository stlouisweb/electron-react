## Electron - React Starter
This is boilerplate/scaffolding application with Electron (the javascript toolkit for developing desktop apps with nodeJS and chromium) and ReactJS (the javascript library for building user interfaces).

### Getting started
1. Clone this repo and run `npm install`
2. Run `npm run dev`

`npm run dev` uses an npm module called [foreman](https://www.npmjs.com/package/foreman) to start the webpack-dev-server for React, and then launch the Electron app once the dev server is up and handling traffic.

### About Electron
You can find the [documentation for Electron here](https://electronjs.org/docs).    

The Electron specific code can be found in the `{project directory}/index.js` file and the `{project directory}/app` directory.

This app uses [electron-store](https://github.com/sindresorhus/electron-store) to maintain application state between user sessions, and [redux](https://redux.js.org/) to manage state across browser windows (electron windows running the react app).

The redux store is kept on the electron side and you can use Electron's interprocess communication to make a request from react to electron to either fetch state or dispatch an action.

### React / Webpack
[React documentation can be found here](https://reactjs.org/)
The application uses a customized [Webpack](https://webpack.js.org/) configuration as opposed to [Create React App](https://github.com/facebookincubator/create-react-app), to facilitate access to the Electron app from the React app.
