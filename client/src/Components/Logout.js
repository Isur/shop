import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';

// language
import lang from './language/lang';

class Logout extends React.Component{
    
    componentDidMount(){
        this.props.logout();
    }
    render(){
    return(
        <div>
        <Message size="huge"> {lang.messages.logout}</Message>
        <Redirect push to="/home" />
        </div>
    )}
}

export default Logout;