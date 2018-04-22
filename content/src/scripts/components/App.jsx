/* eslint-disable-rule no-undef */
 /*global chrome*/
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



