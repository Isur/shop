import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment} from 'semantic-ui-react';
import image from '../images/placeholder-avatar.jpg';
            {/* <Message color="black" size="large">
    <Message.Header> {props.name} </Message.Header>
    <Message.List>
        <Message.Item> {addInfo} </Message.Item>
        <Message.Item> {props.producer} </Message.Item>
        <Message.Item> {props.description} </Message.Item>
        <Message.Item> ${props.value} </Message.Item>
    </Message.List>
  </Message> */}
const Item = (props) => {
    const addInfo = props.diagonal || props.resolution || props.rom || props.ram;
    return(
<Grid.Column>
  <Card>
    <Image src={props.image} fluid onError={(e)=>{e.target.src=image}} circular/>
        
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>{props.producer}</Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='dollar sign' />
        {props.value}
      </a>
    </Card.Content>
  </Card>
</Grid.Column>
    );
}

const Items = (props) => {
    console.log(props.items);
    
return(
    <Segment inverted>
            <Grid columns='five' divided>
                {props.items && props.items.length > 0 && props.items.map(({name,producer,value,description, _id, diagonal, resolution,ram,rom,type, imageLink}) => (
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
                        image={imageLink}
                        />
                ))}
            </Grid>
                {(!props.items || props.items.length === 0) && <Message size="massive"> Na tej stronie nie ma produktów.</Message>}
            </Segment>
        );
    }

export default Items;