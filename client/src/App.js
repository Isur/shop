// React
import React from 'react';
// Components
import Items from './Components/Items';
import Menu from './Components/Menu';
import Header from './Components/Header';
// utilities
import axios from 'axios';
import createHistory from "history/createBrowserHistory";
import ReactQueryParams from 'react-query-params';
// images, css
import './App.css';
// History 
const history = createHistory();
const location = history.location;
class App extends ReactQueryParams {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      loaded:false,
      category: 'all',
      items: [],
      pages: 1,
      search: '',
      sort: "value",
      location: location.pathname
    };

  }
  
  componentDidMount(){
    const path = location.pathname.split('/');
    if(path[2] === 'all'){
      this.setState({
        category: location.pathname.split('/')[3] || '',
        page: this.queryParams.page || 1
      }, async () => {
        this.getItems();
      })
    }else if(path[2] === 'search'){
      let searchState;
      let pageState;
      if(this.queryParams.name) searchState = this.queryParams.name;
      if(this.queryParams.page)  pageState = this.queryParams.page;
      this.setState({
        category: location.pathname.split('/')[3] || '',
        search: searchState || '',
        page: pageState || 1
       }, async () => {
        this.getSearchItems();
      })
    }else{
      this.getItems();
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
    sort = (event, data) => {
      this.setState({
        sort: data.value,
        page: 1
      },async () => {
        if(this.state.search === null || this.state.search==='') this.getItems();
      else this.getSearchItems();
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
      history.push(`/products/all/${this.state.category}?page=${this.state.page}&sort=${this.state.sort}`);
      axios.get(`/products/all/${this.state.category}?page=${this.state.page}&sort=${this.state.sort}`)
      .then((res) => {
        this.setState({ 
          items: res.data.items,
          loaded: true,
          pages: res.data.pages,
        });
      }).catch(err =>{ console.log(err);
        this.setState({items: [], loaded: true})
      });   
    });
  }

  getSearchItems = () =>{
    if(this.state.search === ''){
      this.getItems(this.state.category,1);
      return;
    }
    this.setState({
      loaded:false,
    }, async () => {
      const q = `/products/search/${this.state.category}/?name=${this.state.search}&page=${this.state.page}&sort=${this.state.sort}`;
      history.push(q);
      axios.get(q).then((res) => {
          this.setState({
          items: res.data.items.map(a => a._source),
          pages: res.data.pages,
          loaded: true
        });
      });
    })
  }

    
  
  render() {
    return (

      <div className="App">
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
          category={this.state.category}
          />
        {this.state.loaded===true &&
        <Items items={this.state.items}/> }


      </div>

    );
  }
}

export default App;
