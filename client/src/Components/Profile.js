import React from 'react';
import { Icon, Card, Button, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'react-cookies';

// language
import lang from './language/lang';


const ProfileCard = (props) => (
    <Card
    centered
      image='https://picsum.photos/200/300/?random'
      header={`${props.firstName} ${props.lastName}`}
      meta={props.login}
      description={props.mail}
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
            mail: '',
            editMode: false,
            newFirstName: '',
            newLastName: '',
            newMail: '',
            newPassword: ''
        }
        this.onClickEdit = this.onClickEdit.bind(this);
        this.inputChange = this.inputChange.bind(this);
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

    onClickEdit = (event) => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    onClickModify = () => {
        axios({
            method: 'post', 
            url:`/user/updateUser`,
            headers: {
                'Authorization' : cookie.load('token')
            },
            data:{
                id: cookie.load('id'),
                firstName: this.state.newFirstName,
                lastName: this.state.newLastName,
                mail: this.state.newMail,
                password: this.state.newPassword
            }
        }).then(res => {
            if(res.status===200)alert('Zrobione!');
            this.setState({
                editMode: false,
                newFirstName: '',
                newLastName: '',
                newMail: '',
                newPassword: ''
            })
        })
    }

    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        this.getData();
        return (
            <Segment inverted>
         <ProfileCard 
            id={this.state.id}
            login={this.state.login}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            mail={this.state.mail}
         />
         <Button negative={!this.state.editMode} positive={this.state.editMode} onClick={this.onClickEdit}> {lang.buttons.editData} </Button>
         {this.state.editMode && <div> 
             <Form>
                 <Form.Input placeholder={lang.placeholders.firstName} name="newFirstName" onChange={this.inputChange} value={this.state.newFirstName}/>
                 <Form.Input placeholder={lang.placeholders.lastName} name="newLastName" onChange={this.inputChange} value={this.state.newLastName}/>
                 <Form.Input placeholder={lang.placeholders.mail} name="newMail" onChange={this.inputChange} value={this.state.newMail}/>
                 <Form.Input type="password" placeholder={lang.placeholders.password} name="newPassword" onChange={this.inputChange} value={this.state.newPassword}/>
                 <Button onClick={this.onClickModify}> {lang.buttons.confirmNewData} </Button>
             </Form>
        </div>}
         </Segment>
        );
    }
}

export default Profile;