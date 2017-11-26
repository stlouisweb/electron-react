import React, {Component} from 'react';
import { ipcRenderer } from 'electron';
import style from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    ipcRenderer.send('mainWindow:ready', "");
    ipcRenderer.on('appState:send', (event, appState) => {
      this.setState(appState);
    });
    ipcRenderer.on('appState:fetch', (event) => {
      ipcRenderer.send('appState:recieved', this.state)
    })
  }

  handleTextChange = (event) => {
    const text = event.target.value;
    console.log(text);
    this.setState({text: text});
  }

  render() {
    return (
      <div>
        <h2>Hello From React!</h2>
        <input type='text' onChange={this.handleTextChange} value={this.state.text} />
      </div>
    );
  }
}

export default App;
