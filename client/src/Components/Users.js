import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment, Button} from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'react-cookies';
import Loading from './Loading';

const Item = (props) => {
    return(
        <Grid.Column mobile={16} tablet={8} computer={3} >
            <Card>
                <Card.Content>
                    <Card.Header>{props.firstName} {props.lastName}</Card.Header>
                    <Card.Meta>{props.login}</Card.Meta>
                    <Card.Description>{props.mail}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p style={{color: "silver", fontWeight: "bolder"}}>
                        {props.id} <br />
                        {props.type}
                    </p>
                    {props.id !== cookie.load('id') && <Button color="red" icon onClick={()=>props.delete(props.id)}>
                        <Icon name="delete"/>
                    </Button>}
                    {props.id === cookie.load('id') && <Button positive disabled> To Ty </Button>}
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

class Users extends React.Component{
constructor(){
    super();
    this.state = {
        users: [],
        loading: true,
    }
}

getUsers = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: '/user/all',
            headers: {'Authorization' : cookie.load('token')}
        }).then(res => {
            if(res.data.success === 'false')
                reject(res.data);
            else 
                resolve(res.data);
        });
    })
}

componentDidMount(){
    this.getUsers().then(res => {
        this.setState({
            users: res,
            loading: false
        })
    });
}

deleteUser = (id) => {
    this.setState({loading: true});
    axios({
        method: 'delete',
        url: `user/delete/${id}`,
        headers: {'Authorization' : cookie.load('token')}
    }).then(res => {
        this.getUsers().then(res => {
            this.setState({users: res, loading: false});
        });
    })
}
    render(){
        return(
            <Segment inverted>
                {this.state.loading && <Loading />}
                <Grid stackable  divided className="ui center aligned grid">
                    {this.state.users && this.state.users.length > 0 && this.state.users.map((user) => (
                        <Item 
                            key={user._id} 
                            id={user._id}
                            firstName={user.firstName} 
                            lastName={user.lastName}
                            mail={user.mail}
                            login={user.login}
                            type={user.type}
                            delete={this.deleteUser}
                        />
                    ))}
                </Grid>
            </Segment>
        );
    }
}

export default Users;