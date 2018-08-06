import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
// language
import lang from './language/lang';

const Loading = () => {
    return(
        <Message icon size="massive">
            <Icon name='circle notched' loading size="huge"/>
                <Message.Content>
                    <Message.Header>{lang.messages.loading}</Message.Header>
                    {lang.messages.pleaseWait}
                </Message.Content>
        </Message>
    )
}

export default Loading;