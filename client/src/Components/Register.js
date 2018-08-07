import React from 'react';
import { Segment, Container, Button, Form, Input, Divider, Message } from 'semantic-ui-react';
import axios from 'axios';
import Loading from './Loading';

// language
import lang from './language/lang';

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
    constructor(props) {
        super(props);
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

        this.notify = props.notify;
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
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail) === false){
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
                        if(res.data.success === false){
                            this.setState({sending: false, error: true})
                        }else{
                            this.clearForm(); 
                            this.setState({sent:true, sending: false});
                            this.notify(lang.notifications.onRegister);
                        }
                    })
                    .catch(err => console.log(err));
                });
            }
        });
    }
    
    render(){
        const errorMessage = lang.errors.fillEverything;
        const sentMessage = lang.messages.userAdded;
        return(
            <Segment inverted>
            <Container text textAlign="center">
                {this.state.sending && <Loading />}
            <Form inverted>
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> 
                         {lang.labels.login} 
                         {this.state.loginError && 
                            <span style={style_error}> - {lang.errors.loginValidation} </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder={lang.placeholders.login}
                        onChange={this.validateLogin}    
                        value={this.state.login}
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> 
                        {lang.labels.password}
                        {this.state.passwordError && 
                            <span style={style_error}> - {lang.errors.passwordValidation} </span>}
                    </label>
                     <Input 
                        fluid 
                        type="password" 
                        placeholder={lang.placeholders.password}
                        onChange={this.validatePassword}
                        value={this.state.password}
                    /> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> 
                         {lang.labels.mail}
                         {this.state.mailError &&
                            <span style={style_error}> - {lang.errors.mailValidation} </span>}
                    </label>
                     <Input 
                        fluid  
                        type="mail" 
                        placeholder={lang.placeholders.mail}
                        onChange={this.validateMail}
                        value={this.state.mail}
                    /> 
                </Form.Field>
                <Form.Field> 
                    <label style={style}> 
                         {lang.labels.firstName}
                         { this.state.firstNameError &&
                            <span style={style_error} > - {lang.errors.firstNameValidation} </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder={lang.placeholders.firstName}
                        onChange={this.validateFirstName}
                        value={this.state.firstName}
                    /> 
                </Form.Field>
                <Form.Field> 
                    <label style={style}> 
                        {lang.labels.lastName}
                         { this.state.lastNameError &&
                            <span style={style_error} > - {lang.errors.lastNameValidation} </span>}
                    </label>
                     <Input 
                        fluid 
                        type="text" 
                        placeholder={lang.placeholders.lastName}
                        onChange={this.validateLastName}
                        value={this.state.lastName}
                    /> 
                </Form.Field>
                <Divider horizontal />
                {this.state.error === true && <Message negative> {errorMessage} </Message>}
                {this.state.sent === true && <Message positive> {sentMessage} </Message>}                                
                <Form.Field> 
                     <label style={style}>&nbsp;</label>
                     <Button primary fluid onClick={this.submit}> {lang.buttons.register} </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default Register;