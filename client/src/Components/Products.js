// REACT
import React from 'react';
// COMPONENTS
import Header from './Header';
import Menu from './Menu';
import PaginationMenu from './PaginationMenu';
import Items from './Items';
import Loading from './Loading';
// UTILITIES
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import ReactQueryParams from 'react-query-params';

class Products extends ReactQueryParams{
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            items: [],
            category: props.category,
            sort: 'value',
            page: 1,
            pages: undefined,
            search: ''
        }
    }

    componentDidMount(){
        this.setState({
            page: this.queryParams.page || 1,
            sort: this.queryParams.sort || 'value',
            search: this.queryParams.search || '',
        }, async () => {
            this.getItems();

        })
    }
    getItems = () => {
        if(this.state.search === null || this.state.search === '') 
          return this.getAllItems()
        else
          return this.getSearchItems();    
      }
      getAllItems = () =>{
        this.setState({
          loaded: false,
        }, async () => {
          const q = `/products/all/${this.state.category}?page=${this.state.page}&sort=${this.state.sort}`;
            this.setQueryParams({
	            page: this.state.page,
                sort: this.state.sort,
                search: undefined
            });
            
            
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
          this.setQueryParams({
            page: this.state.page,
            sort: this.state.sort,
            search: this.state.search,
            });
          axios.get(q).then((res) => {
            
              this.setState({
              items: res.data.items.map(data => {
                data._source._id = data._id;
                return data._source
                }),
              pages: res.data.pages,
              loaded: true
            });
          });
        })
      }
      clearInput = () => {
        this.setState({search: ''});
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
    
    previousPage = () => {
        if(this.state.page > 1) 
            this.setState({page: this.state.page -1}, async () => {this.getItems()});
    }
    nextPage = () => {
        if(this.state.page < this.state.pages) 
            this.setState({page: this.state.page +1}, async () => {this.getItems()});
    }
    selectPage = (page) =>{
        this.setState({
            page: page,
        }, async () => {
            this.getItems();
        })
    }

    search = (event) => {
        this.setState({
          search: event.target.value,
          page: 1,
        }, async () =>{
          this.getItems();
        })
    }

    deleteItem = (id) => {
      this.setState({
        items: this.state.items.filter(el => el._id !== id)
      })
      axios.delete(`/api/delete/${id}`);
    }
    render(){
    return(
    <div>
        <Segment inverted >
            <Menu />    
            <Header 
                input={this.state.search} 
                category={this.state.category}
                page={this.state.page}
                search={this.search}
                sort={this.sort}
            />
            <PaginationMenu 
                previousPage={this.previousPage} 
                nextPage={this.nextPage} 
                page={this.state.page} 
                maxPages={this.state.pages}
                selectPage={this.selectPage}
            />
        </Segment>
        <Segment inverted>
           {this.state.loaded && <Items items={this.state.items} deleteItem={this.deleteItem} />}
           {!this.state.loaded && <Loading />}
        </Segment>
    </div>
    )}
};

export default Products;