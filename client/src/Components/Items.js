import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment, Button} from 'semantic-ui-react';
import image from '../images/placeholder-avatar.jpg';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

// language
import lang from './language/lang';
import axios from 'axios';
import { resolve } from 'path';

const Item = (props) => {
    return(
        <Grid.Column mobile={16} tablet={8} computer={3} >
            <Card>
                <Image src={props.image} fluid onError={(e)=>{e.target.src=image}}/>
                <Card.Content>
                    <Card.Header><Link to={{
                        pathname: `/products/item/`,
                        search: `?id=${props.id}`,
                    }}>{props.name}</Link></Card.Header>
                    <Card.Meta>{props.producer}</Card.Meta>
                    <Card.Description>{props.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p style={{color: "green", fontWeight: 'bolder'}}>
                        <Icon name='dollar sign' /> {props.value}
                    </p>
                    <p style={{color: "silver", fontWeight: "bolder"}}>
                        {props.type}
                    </p>
                    { cookie.load('token') && props.user.permissions.addProducts === true &&  <Button color="red" icon onClick={() => props.deleteItem(props.id)}>
                        <Icon name="delete"/>
                    </Button>}
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

class Items extends React.Component{
constructor(props){
    super(props);
    this.state = props;
    this.deleteItem = props.deleteItem;
}

componentDidMount(){
    this.setState({
        user: {},
        loading: true
    });
    this.getUsers().then(res => this.setState({user:res, loading: false})).catch(res => this.setState({loading: false}));
}


    getUsers = () => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `/user/user/${cookie.load('id')}`,
                headers: {
                    'Authorization': cookie.load('token')
                }
            })
            .then(user => resolve(user.data))
            .catch(err => reject({"success": false}));
        })
    }
render(){
    console.log(this.state.user);
    return(
        <Segment inverted>
            <Grid stackable  divided className="ui center aligned grid">
                {this.state.loading === false && this.state.items && this.state.items.length > 0 && this.state.items.map(({name,producer,value,description, _id,imageLink,itemType}) => (
                    <Item 
                        key={_id} 
                        id={_id}
                        name={name} 
                        producer={producer} 
                        value={value} 
                        description={description} 
                        image={imageLink}
                        type={itemType}
                        deleteItem={this.deleteItem}
                        user={this.state.user}
                    />
                ))}
            </Grid>
                    {(!this.state.items || this.state.items.length === 0) && 
                    <Message size="massive"> {lang.errors.noProducts} </Message>}
        </Segment>
    );
}
}

export default Items;