import React, {Component} from 'react';
import { ipcRenderer } from 'electron';
import style from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
    ipcRenderer.send('mainWindow:ready', '');
  }

  componentDidMount() {
    ipcRenderer.on('appState:changed', (event, state) => {
      this.setState(state);
      setTimeout(function() { ipcRenderer.send('app:ready', '') }, 2000); // remove setTimeout, it's for testing/demo purposes only.

    });
  }

  handleClick = () => {
    ipcRenderer.send('text:update', 'hello');
  }

  handleClear = () => {
    ipcRenderer.send('text:update', '');
  }

  render() {
    console.log(this.state.text);
    return (
      <div>
        <h2>Hello From React!</h2>
        {this.state.text}
        <button onClick={this.handleClick}>push</button>
        <button onClick={this.handleClear}>clear</button>
      </div>
    );
  }
}

export default App;
