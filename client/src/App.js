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

  }

  getItems = () => {
    if(this.state.search === null || this.state.search === '') 
      return this.getAllItems()
    else
      return this.getSearchItems();    
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
        
      </div>
    );
  }
}
export default App;