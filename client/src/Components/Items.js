import React, { Component } from 'react';
import axios from 'axios';

const Item = (props) => {
    return(
        <div>
            <p> {props.name} - {props.producer} - {props.description} - {props.value} </p>
            <hr />
        </div>
    )
}

class Items extends Component{
    state = {
        item: [{name: "test", description:"test", value: 1, producer:"test", _id: 1}]
    }
    
    componentDidMount(){
        axios.get('/products/tvs').then((res) => {
           console.log(res.data);
           this.setState({ 
               item: res.data 
            });
        });
        }
    render(){
        return(
            <div>
                {this.state.item.map(({name,producer,value,description, _id}) => (
                    <Item name={name} producer={producer} value ={value} description={description} key={_id}/>
                ))}
            </div>
        );
    }
}

export default Items;