import React, { Component } from 'react';
import Items from './Components/Items';
import Menu from './Components/Menu';

import axios from 'axios';

import fillDatabase from './db/db';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    page: 1,
    loaded:false,
    category: '',
    items: []
  }

  componentDidMount(){
    this.getItems();
  }

    nextPage = () =>{
      this.setState({
        page: this.state.page +1
      })
      this.getItems();
    }

    previousPage = () =>{
      this.setState({
        page: this.state.page -1
      })
      this.getItems();
    }
  selectCategory = (cat) =>{
    this.setState({
      category: cat
    });
    
    this.getItems();
    
  }

  getItems = () =>{
    this.setState({
      loaded: false,
    });

    axios.get(`/products/${this.state.category}/${this.state.page}`)
      .then((res) => {
        this.setState({ 
          items: res.data,
          loaded: true
        });
      });       
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Shop</h1>
        </header>
        <Menu selectCategory={this.selectCategory}
        previousPage={this.previousPage}
        nextPage={this.nextPage}/>
        {this.state.loaded===true &&
        <Items items={this.state.items}/>
        }


      </div>

    );
  }
}

export default App;
