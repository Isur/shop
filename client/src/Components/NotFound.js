import React from 'react';
import { Message } from 'semantic-ui-react';
// language
import lang from './language/lang';

const NotFound = () => {
    return(
        <Message size="huge"> {lang.errros.pageNotFound} </Message>
    )
}

export default NotFound;