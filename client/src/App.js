// React
import React, { Component } from 'react';
// Components
import Items from './Components/Items';
import Menu from './Components/Menu';
// utilities
import axios from 'axios';
import createHistory from "history/createBrowserHistory";
// images, css
import logo from './logo.svg';
import './App.css';
// History 
const history = createHistory();
const location = history.location;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      loaded:false,
      category: '',
      items: [],
      pages: 1
    };
  }

  componentDidMount(){
    this.setState({
      category: location.pathname.split('/')[2] || '',
      page: parseInt(location.pathname.split('/')[3], 10) || 1
    }, async () => {
      this.getItems(this.state.category, this.state.page);
    })

  }

    nextPage = () =>{
      if(this.state.page < this.state.pages)
        this.getItems(this.state.category, this.state.page + 1);
    }

    previousPage = () =>{
      if(this.state.page === 1) return;
      if(this.state.page > this.state.pages){
        this.getItems(this.state.category, this.state.pages);  
        return;
      }
      
      this.getItems(this.state.category, this.state.page - 1);
    }
  selectCategory = (cat) =>{
      this.getItems(cat,1);
  }

  getItems = (cat,page) =>{
    this.setState({
      loaded: false,
      category: cat,
      page: page
    }, async () => {
      axios.get(`/products/${this.state.category}/${this.state.page}`)
      .then((res) => {
        this.setState({ 
          items: res.data.items,
          loaded: true,
          pages: res.data.pages,
        });
        history.push(`/products/${this.state.category}/${this.state.page}`);
      }).catch(err =>{ console.log(err);
        this.setState({items: [], loaded: true})
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
        <Menu 
          selectCategory={this.selectCategory}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          page={this.state.page}
        />
        {this.state.loaded===true &&
        <Items items={this.state.items}/> }


      </div>

    );
  }
}

export default App;
