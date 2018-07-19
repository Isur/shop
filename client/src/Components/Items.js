import React from 'react';
import { Message } from 'semantic-ui-react';

const Item = (props) => {
    const addInfo = props.diagonal || props.resolution || props.rom || props.ram;
    return(
            <Message color="black" size="large">
    <Message.Header> {props.name} </Message.Header>
    <Message.List>
        <Message.Item> {addInfo} </Message.Item>
        <Message.Item> {props.producer} </Message.Item>
        <Message.Item> {props.description} </Message.Item>
        <Message.Item> ${props.value} </Message.Item>
    </Message.List>
  </Message>
    )
}

const Items = (props) => {
    console.log(props.items);
return(
            <div>
                {props.items && props.items.length > 0 && props.items.map(({name,producer,value,description, _id, diagonal, resolution,ram,rom,type}) => (
                    <Item 
                        key={_id} 
                        name={name} 
                        producer={producer} 
                        value={value} 
                        description={description} 
                        rom={rom} 
                        ram={ram} 
                        diagonal={diagonal} 
                        resolution={resolution}
                        type={type}
                        />
                ))}
                {(!props.items || props.items.length === 0) && <Message compact> Na tej stronie nie ma produktów.</Message>}
            </div>
        );
    }

export default Items;