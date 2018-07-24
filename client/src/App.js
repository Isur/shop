// React
import React from 'react';
// Components
import Items from './Components/Items';
import Menu from './Components/Menu';
import Header from './Components/Header';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Loading from './Components/Loading';
import PaginationMenu from './Components/PaginationMenu';
import MainMenu from './Components/MainMenu';
// utilities
import axios from 'axios';
import createHistory from "history/createBrowserHistory";
import ReactQueryParams from 'react-query-params';
// images, css
import './App.css';
// History 
const history = createHistory();
const location = history.location;

const mainPage = (route, loaded, items) =>{
  if(route === 'products'){
    if(loaded === false)
      return <Loading />
    return <Items items={items}/>
  }
  else if(route === 'home'){
    return <Home />
  }else {
    return <NotFound />
  }
}
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
    };
    //this.selectRoute('home');
  }
  
  componentDidMount(){
    const path = location.pathname.split('/');
    if(path[1] === 'products'){
      if(path[2] === 'all'){
        this.setState({
          category: location.pathname.split('/')[3] || 'all',
          page: this.queryParams.page || 1,
          sort: this.queryParams.sort || "value",
          route: "products"
        }, async () => {
          this.getAllItems();
        })
      }else if(path[2] === 'search'){
        this.setState({
          category: location.pathname.split('/')[3] || '',
          search: this.queryParams.name || 'all',
          page: this.queryParams.page || 1,
          sort: this.queryParams.sort || "value",
          route: "products"
        }, async () => {
          this.getSearchItems();
        })
      }else{
        this.getItems();
      }
    }
    else {
      this.selectRoute(path[1])
    }
  }

  getItems = () => {
    if(this.state.search === null || this.state.search === '') 
      return this.getAllItems()
    else
      return this.getSearchItems();    
  }

  selectRoute = (route) =>{
    this.setState({
      route: route
    });
    history.push(`/${route}`);
    if(route === 'products') 
      this.getItems();
  }
  
  search = (event) => {
    this.setState({
      search: event.target.value,
      page: 1,
      route: "products",
    }, async () =>{
      this.getItems();
    })
  }
   
  sort = (event, data) => {
    this.setState({
      sort: data.value,
      page: 1,
      route: "products",
    },async () => {
      this.getItems();
    });
  }

  selectPage = (page) => {
    this.setState({page: page}, async () => {
    this.getItems();
    });
  }

  nextPage = () =>{
    if(this.state.page < this.state.pages){
      this.setState({page: this.state.page+1},async () => {
        this.getItems();
      });
    }
  }

  previousPage = () =>{
    if(this.state.page === 1) return;
    this.setState(() => { 
      if(this.state.page > this.state.pages){
        return{page: this.state.pages};
      }
        return {page: this.state.page-1};
    }, async () => {
      if(this.state.page > this.state.pages){
        this.getItems();
        return;
      }
      this.getItems();
    });
  }
  selectCategory = (cat) =>{
    this.clearInput();
    this.setState({category: cat, page: 1, route:"products"},async () => {
      this.getItems();
    });
  }

  clearInput = () => {
    this.setState({search: ''});
  }

  getAllItems = () =>{
    this.setState({
      loaded: false,
    }, async () => {
      const q = `/products/all/${this.state.category}?page=${this.state.page}&sort=${this.state.sort}`
      history.push(q);
      axios.get(q)
      .then((res) => {
        this.setState({ 
          items: res.data.items,
          loaded: true,
          pages: res.data.pages,
        });
      }).catch(err =>{ console.log(err);
        this.setState({
          items: [], 
          loaded: true})
      });   
    });
  }

  getSearchItems = () =>{
    this.setState({
      loaded:false,
    }, async () => {
      const q = `/products/search/${this.state.category}/?name=${this.state.search}&page=${this.state.page}&sort=${this.state.sort}`;
      history.push(q);
      axios.get(q).then((res) => {
          this.setState({
          items: res.data.items.map(data => data._source),
          pages: res.data.pages,
          loaded: true
        });
      });
    })
  }

  

  render() {
    return (
      <div className="App">
      <MainMenu selectRoute={this.selectRoute} />
      {this.state.route === 'products' &&
        <div><Menu 
          selectCategory={this.selectCategory}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          page={this.state.page}
          maxPages={this.state.pages}
          selectPage={this.selectPage}
          selectRoute={this.selectRoute}
        />
        <Header 
          search={this.search}
          input={this.state.search}
          page={this.state.page}
          sort={this.sort}
          category={this.state.category}
          />
           { this.state.pages > 1 && <PaginationMenu 
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          page={this.state.page}
          maxPages={this.state.pages}
          selectPage={this.selectPage}
          /> }</div>}
        {mainPage(this.state.route, this.state.loaded, this.state.items)}
      </div>
    );
  }
}
export default App;