/* eslint-disable-rule no-undef */
 /*global chrome*/
import React, {Component} from 'react';
import axios from 'axios';
import '../../../css/index.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      listOfSites: Array(3).fill(0)
    }
  }
  
  getData(){
    axios.get('https://softomate.net/ext/employees/list.json')
      .then(response => 
        this.setState({listOfSites:response.data}))
      .catch(err => console.log('parsing failed', err))
  }

  componentDidMount(){
    this.getData();
  }
  

  render() {
    const items = this.state.listOfSites.slice();
    const listItems = items.map((element, index) =>
      <li className="exists" key={index}>
        <a href={`https://${element.domain}`} target="_blank" rel="nofollow noopener">
          {element.domain}
        </a>  
      </li>
    );
    return (
      <div>{listItems}</div>
    );
  }
}

export default App;