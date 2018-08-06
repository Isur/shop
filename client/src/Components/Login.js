import React from 'react';
import { Segment, Container, Button, Form, Input, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

const style = {
    color: 'silver',
    fontWeight: 'bolder',
    fontSize: 'larger'
}

class Login extends React.Component{
constructor(props){
    super(props);
    this.state = {
        login: '',
        password: '',
        sending: false,
        sent: false,
        error: false,
        auth: false
    }
    console.log(props);
    this.passwordChange = this.passwordChange.bind(this);
    this.loginChange = this.loginChange.bind(this);
}

login = () => {
    axios.post('/user/login', {
        login: this.state.login,
        password: this.state.password
    }).then(login => {
        this.setState({auth: login.data.success, error: !login.data.success});
        this.props.login(login.data.token, login.data.id, login.data.type);
        
    })
}

loginChange = (event) => {
    this.setState({
        login: event.target.value
    })
}

passwordChange = (event) => {
    this.setState({
        password: event.target.value
    })
}

    render(){
        if(this.state.auth === true){
            return <Redirect push to="/home" />
        }
        return(
            <Segment inverted>
            <Container text textAlign="center">
                {this.state.auth && <Message positive> ZALOGOWANO! </Message>}
                {this.state.error && <Message negative> Błędne dane logowania! </Message>}
            <Form inverted>
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> Login</label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder="Login..."
                        onChange={this.loginChange}    
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> Hasło</label>
                     <Input 
                        fluid 
                        type="password" 
                        placeholder="Hasło..."
                        onChange={this.passwordChange}    
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}>&nbsp;</label>
                     <Button 
                        primary 
                        fluid
                        onClick={this.login}    
                    > Login </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default Login;