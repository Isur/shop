import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'react-cookies';
const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
  )
const ProfileCard = (props) => (
    <Card
    centered
      image='https://picsum.photos/200/300/?random'
      header={`${props.firstName} ${props.lastName}`}
      meta={props.login}
      description={props.mail}
      //extra={extra}
    />
  )

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            login: '',
            firstName: '',
            lastName: '',
            mail: ''
        }
    }


    getData = () => {
        axios({method: 'get', url:`/user/user/${cookie.load('id')}`, headers: {'Authorization' : cookie.load('token')}})
        .then(res => this.setState({
            id: res.data.id,
            login: res.data.login,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            mail: res.data.mail
        }))
    }

    render(){
        this.getData();
        return (
         <ProfileCard 
            id={this.state.id}
            login={this.state.login}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            mail={this.state.mail}
         />
        );
    }
}

export default Profile;