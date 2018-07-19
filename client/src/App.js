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
      category: 'all',
      items: [],
      pages: 1,
      search: '',
      sort: "value"
    };

  }

  componentDidMount(){
    const path = location.pathname.split('/');
    if(path[2] === 'all'){
      this.setState({
        category: location.pathname.split('/')[3] || '',
        page: parseInt(location.search.split('=')[1], 10) || 1
      }, async () => {
        this.getItems();
      })
    }else if(path[2] === 'search'){
      var search = location.search.split('&');
      var searchState  = '';
      var pageState = 1;
      if(search[0] && search[0].split('=')[0] === '?name')  searchState = search[0].split('=')[1] || '';
      if(search[1])  pageState = search[1].split('=')[1] || 1;
      console.log(searchState);
      this.setState({
        category: location.pathname.split('/')[3] || '',
        search: searchState|| '',
        page: pageState || 1
       }, async () => {
        this.getSearchItems();
      })
    }
  }

    search = (event) => {
      this.setState({
        search: event.target.value,
        page: 1
      }, async () =>{
        this.getSearchItems();
      })
    }
    sort = (event) => {
      this.setState({
        sort: event.target.value,
        page: 1
      },async () => {
        this.getSearchItems()
      });
    }
    selectPage = (page) => {
      this.setState({page: page}, async () => {
      if(this.state.search === null || this.state.search==='') this.getItems();
      else this.getSearchItems();
      });
    }
    nextPage = () =>{
      if(this.state.page < this.state.pages){
        this.setState({page: this.state.page+1},async () => {
          if(this.state.search === null || this.state.search==='') this.getItems();
          else this.getSearchItems();
        });
        }

    }

    previousPage = () =>{
      if(this.state.page === 1) return;
      this.setState({page: this.state.page-1}, async () => {
      if(this.state.page > this.state.pages){
        if(this.state.search === null || this.state.search==='') this.getItems();
          else this.getSearchItems(); 
        return;
      }
      
      if(this.state.search === null || this.state.search==='') this.getItems();
      else this.getSearchItems();
    });
    }
  selectCategory = (cat) =>{
      this.clearInput();
      this.setState({category: cat, page: 1},async () => {
        this.getItems();
      });
  }

  clearInput = () => {
    this.setState({search: ''});
  }

  getItems = () =>{
    this.setState({
      loaded: false,
    }, async () => {
      axios.get(`/products/all/${this.state.category}?page=${this.state.page}`)
      .then((res) => {
        this.setState({ 
          items: res.data.items,
          loaded: true,
          pages: res.data.pages,
        });
        history.push(`/products/all/${this.state.category}?page=${this.state.page}`);
      }).catch(err =>{ console.log(err);
        this.setState({items: [], loaded: true})
      });   
    });
  }

  getSearchItems = () =>{
    if(this.state.query === ''){
      this.getItems(this.state.category,1);
      return;
    }
    this.setState({
      loaded:false,
    }, async () => {
      const q = `/products/search/${this.state.category}/?name=${this.state.search}&page=${this.state.page}&sort=${this.state.sort}`;
      axios.get(q).then((res) => {
          this.setState({
          items: res.data.items.map(a => a._source),
          pages: res.data.pages,
          loaded: true
        });
        history.push(q);
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
          search={this.search}
          input={this.state.search}
          page={this.state.page}
          sort={this.sort}
          />
        {this.state.loaded===true &&
        <Items items={this.state.items}/> }


      </div>

    );
  }
}

export default App;
