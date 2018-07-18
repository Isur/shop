// React
import React, { Component } from 'react';
// Components
import Items from './Components/Items';
import Menu from './Components/Menu';
import Header from './Components/Header';
// utilities
import axios from 'axios';
import createHistory from "history/createBrowserHistory";
// images, css
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
      pages: 1,
      search: null
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
    search = (event) => {
      this.setState({
        search: event.target.value
      }, async () =>{
        this.getSearchItems(this.state.category, this.state.search);
      })
    }

    selectPage = (page) => {
      this.getItems(this.state.category, page);
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
      axios.get(`/products/all/${this.state.category}/${this.state.page}`)
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

  getSearchItems = (cat, query) =>{
    console.log(query);
    this.setState({
      loaded:false,
      category: cat
    }, async () => {
      const q = `/products/search/${this.state.category}/${query}`;
      console.log(q);
      axios.get(q).then((res) => {
        console.log(res);
        var result = [];
        if(res.data[0]){
          result = res.data.map(a => a._source);
        }else {result = res.data.items}
        console.log(result);
          this.setState({
          items: result,
          loaded: true
        })
      });
    })
  }

    
  
  render() {
    return (

      <div className="App">
      {/* <Dimmer active={!this.state.loaded}>
        <Loader>Loading</Loader>
      </Dimmer> */}
        <Menu 
          selectCategory={this.selectCategory}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          page={this.state.page}
          maxPages={this.state.pages}
          selectPage={this.selectPage}
        />
        <Header 
          search={this.search}/>
        {this.state.loaded===true &&
        <Items items={this.state.items}/> }


      </div>

    );
  }
}

export default App;
