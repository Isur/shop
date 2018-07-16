import React, { Component } from 'react';
import Items from './Components/Items';

import axios from 'axios';

import fillDatabase from './db/db';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loaded:false
  }

  componentDidMount(){
    axios.get('/products/').then((res) => {
       this.setState({ 
           items: res.data 
        });
    }).then(() => {
      if(this.state.items.length === 0){
        fillDatabase(20).then(this.setState({loaded:true}));
      }else{
      this.setState({
        loaded: true
      })};
  
    });
    }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.loaded===true &&
        <Items items={this.state.items}/>
        }
      </div>

    );
  }
}

export default App;
