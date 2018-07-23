import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment} from 'semantic-ui-react';
import image from '../images/placeholder-avatar.jpg';

const Item = (props) => {
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
      <p style={{color: "green", fontWeight: 'bolder'}}>
        <Icon name='dollar sign' />
        {props.value}
      </p>
      <p>{props.type}</p>
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
                {props.items && props.items.length > 0 && props.items.map(({name,producer,value,description, _id,imageLink,itemType}) => (
                    <Item 
                        key={_id} 
                        name={name} 
                        producer={producer} 
                        value={value} 
                        description={description} 
                        image={imageLink}
                        type={itemType}
                        />
                ))}
            </Grid>
                {(!props.items || props.items.length === 0) && <Message size="massive"> Na tej stronie nie ma produktów.</Message>}
            </Segment>
        );
    }

export default Items;