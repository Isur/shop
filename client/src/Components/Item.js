import React from 'react';
import { Container, Header, Icon, Divider, Image } from 'semantic-ui-react';
import axios from 'axios';
import ReactQueryParams from 'react-query-params';
import image from '../images/placeholder-avatar.jpg';
class Item extends ReactQueryParams{
constructor(props){
    super(props)
    this.state ={
        name: null,
        value: null,
        description: null,
        shortDesc: null,
        image: null
    }
}

componentDidMount(){
    this.getItem();
}

getItem(){
    axios.get(`/products/search/byId/${this.queryParams.id}`).then(
        res => {
            if(!res.data){
                res.data = [];
            }
            this.setState({
                name: res.data.name,
                value: res.data.value,
                description: res.data.longDescription,
                shortDesc: res.data.description,
                image: res.data.imageLink
            })
        }
    )
}
    render(){
        return(
        <Container text>
            <Header as='h1' color='yellow'><Icon name='shop' />{this.state.name && this.state.name}</Header>
            <Divider inverted />
            <Divider horizontal inverted>
                Skrócony opis
            </Divider>
            <p style={{color:'silver'}}>
                {this.state.shortDesc && this.state.shortDesc}
            </p>
            <Divider horizontal inverted>
                Opis
            </Divider>
            <p style={{color:'silver'}}>
            <Image src={this.state.image && this.state.image} onError={(e)=>{e.target.src=image}} size='small' floated='right' />
                {this.state.description && this.state.description}
            </p><Divider horizontal inverted />
            <Divider horizontal inverted>
                CENA
            </Divider>
            <p style={{color:'silver'}}>
                {this.state.value && this.state.value} <Icon name="dollar" />
            </p>
         </Container>
        );
    }
}
export default Item;