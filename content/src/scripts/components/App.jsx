import React, { Component } from 'react';
import { render } from 'react-dom';
import '../../css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this)
  }

  remove (){
    let item = document.getElementById('rcr-anchor');

    document.documentElement.removeChild(item);
    chrome.runtime.sendMessage({messageText: 3}, this.getResponse);
  }

  getResponse(response) {
    if (chrome.runtime.lastError) {
      console.log("ERROR: ", chrome.runtime.lastError);
    } else {
      console.log(response);  
    }
  }

  render() {
    return (
      <div className="message">{ this.props.message }
        <strong className="close" onClick={this.remove}>x</strong>
      </div>
    );
  }
}

export default App;



