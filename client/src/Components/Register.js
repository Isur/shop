import React from 'react';
import { Segment, Container, Button, Form, Input, Divider } from 'semantic-ui-react';
const style = {
    color: 'silver',
    fontWeight: 'bolder',
    fontSize: 'larger'
}

class Register extends React.Component{
    render(){
        return(
            <Segment inverted>
            <Container text textAlign="center">
            <Form inverted>
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> Login</label>
                     <Input fluid type="text" placeholder="Login..."/> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> Hasło</label>
                     <Input fluid type="password" placeholder="Hasło..."/> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> Mail</label>
                     <Input fluid type="mail" placeholder="Mail..."/> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> Imię</label>
                     <Input fluid type="text" placeholder="Imię..."/> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}> Nazwisko</label>
                     <Input fluid type="text" placeholder="Nazwisko..."/> 
                </Form.Field>
                <Form.Field> 
                     <label style={style}>&nbsp;</label>
                     <Button primary fluid> Rejestracja </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default Register;