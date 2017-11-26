import React, {Component} from 'react';
import { ipcRenderer } from 'electron';
import style from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  componentWillMount() {
    ipcRenderer.send('content:ready', "");
    ipcRenderer.on('content:send', (event, content) => {
      this.setState({text: content});
    });
  }

  render() {
    return (
      <div>
        <h2>Hello From React!</h2>
        <h3>{this.state.text}</h3>
      </div>
    );
  }
}

export default App;
