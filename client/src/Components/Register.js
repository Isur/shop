import React from 'react';
import { Segment, Container, Button, Form, Input, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import Loading from './Loading';
const style = {
    color: 'silver',
    fontWeight: 'bolder',
    fontSize: 'larger'
}
const style_error = {
    color: 'red',
    fontWeight: 'bolder',
    fontSize: 'larger'
}
class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            mail: '',
            firstName: '',
            lastName: '',
            loginError: false,
            passwordError: false,
            mailError: false,
            firstNameError: false,
            lastNameError: false,
            error: true,
            sent: false,
            sending: false,
        }
        this.submit = this.submit.bind(this);
        
        this.validateLogin = this.validateLogin.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateMail = this.validateMail.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
    }

    isError = () =>{
        const {firstNameError, lastNameError, loginError, passwordError, mailError} = this.state;
        if(firstNameError||lastNameError||loginError||passwordError||mailError){
            this.setState({error: true});
            return true;
        } else {
            this.setState({error: false});
            return false;
        }
    }

    validateLogin = (event) => {
        this.setState({
            login: event.target.value
        }, async () => {
            if(this.state.login === '' || this.state.login.length < 4){
                this.setState({loginError: true})
            } else {
                this.setState({loginError: false});
            }

            this.isError();
        });
    }

    validatePassword = (event) => {
        this.setState({
            password: event.target.value
        }, async () => {
            if(this.state.password === '' || this.state.password.length < 6){
                this.setState({passwordError: true});
            } else {
                this.setState({passwordError: false});
            }

            this.isError();
        })
    }

    validateMail = (event) => {
        this.setState({
            mail: event.target.value
        }, async () => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail) === false){
                this.setState({mailError: true})
            } else {
                this.setState({mailError: false});
            }

            this.isError();
        })
    }

    validateFirstName = (event)  => {
        this.setState({
            firstName: event.target.value
        }, async () => {
            if(this.state.firstName === ''){
                this.setState({firstNameError: true})
            } else {
                this.setState({firstNameError: false});
            }

            this.isError();
        });
    }
    
    validateLastName = (event)  => {
        this.setState({
            lastName: event.target.value
        }, async () => {
            if(this.state.lastName === ''){
                this.setState({lastNameError: true})
            } else {
                this.setState({lastNameError: false});
            }

            this.isError();
        });
    }

    clearForm(){
        this.setState({
            login: '',
            password: '',
            mail: '',
            firstName: '',
            lastName: '',
            loginError: false,
            passwordError: false,
            mailError: false,
            firstNameError: false,
            lastNameError: false, 
        })
    }

    submit(event){
        event.preventDefault();
        
        this.setState({sent:false}, async () => {
            if(this.isError() === false){
                this.setState({sending: true}, async () => {
                    axios.post('/user/addUser',{
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        login: this.state.login,
                        password: this.state.password,
                        mail: this.state.mail
                    }).then(res => {
                        this.clearForm(); 
                        this.setState({sent:true, sending: false})
                    });
                });
            }
        });
    }
    
    render(){
        const errorMessage = "Wypełnij poprawnie wszystkie pola.";
            const sentMessage = "Użytkownik dodany."
        return(
            <Segment inverted>
            <Container text textAlign="center">
                {this.state.sending && <Loading />}
            <Form inverted>
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> 
                         Login 
                         {this.state.loginError && 
                            <span style={style_error}> - Wpisz login min 4 znaki. </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder="Login..."
                        onChange={this.validateLogin}    
                        value={this.state.login}
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> 
                        Hasło
                        {this.state.passwordError && 
                            <span style={style_error}> - Wpisz hasło min 6 znaków. </span>}
                    </label>
                     <Input 
                        fluid 
                        type="password" 
                        placeholder="Hasło..."
                        onChange={this.validatePassword}
                        value={this.state.password}
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> 
                         Mail
                         {this.state.mailError &&
                            <span style={style_error}> - Wpisz prawidłowy adres mail </span>}
                    </label>
                     <Input 
                        fluid  
                        type="mail" 
                        placeholder="Mail..."
                        onChange={this.validateMail}
                        value={this.state.mail}
                    /> 
                </Form.Field>
                <Form.Field> 
                    <label style={style}> 
                         Imię
                         { this.state.firstNameError &&
                            <span style={style_error} > - Wpisz swoje imie </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder="Imię..."
                        onChange={this.validateFirstName}
                        value={this.state.firstName}
                    /> 
                </Form.Field>
                <Form.Field> 
                    <label style={style}> 
                         Nazwisko
                         { this.state.lastNameError &&
                            <span style={style_error} > - Wpisz swoje nazwisko </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder="Nazwisko..."
                        onChange={this.validateLastName}
                        value={this.state.lastName}
                    /> 
                </Form.Field>
                <Divider horizontal />
                {this.state.error === true && <Message negative> {errorMessage} </Message>}
                {this.state.sent === true && <Message positive> {sentMessage} </Message>}                                
                <Form.Field> 
                     <label style={style}>&nbsp;</label>
                     <Button primary fluid onClick={this.submit}> Rejestracja </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default Register;