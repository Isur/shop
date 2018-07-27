import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';

class Logout extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.logout();
    }
    render(){
    return(
        <div>
        <Message size="huge"> Wylogowano!</Message>
        <Redirect push to="/home" />
        </div>
    )}
}

export default Logout;