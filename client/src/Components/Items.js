import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment, Button} from 'semantic-ui-react';
import image from '../images/placeholder-avatar.jpg';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return(
        <Grid.Column mobile={16} tablet={8} computer={3} >
            <Card>
                <Image src={props.image} fluid onError={(e)=>{e.target.src=image}}/>
                <Card.Content>
                    <Card.Header><Link to={{
                        pathname: `/products/item/`,
                        search: `?id=${props.id}`,
                    }}>{props.name}</Link></Card.Header>
                    <Card.Meta>{props.producer}</Card.Meta>
                    <Card.Description>{props.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p style={{color: "green", fontWeight: 'bolder'}}>
                        <Icon name='dollar sign' /> {props.value}
                    </p>
                    <p style={{color: "silver", fontWeight: "bolder"}}>
                        {props.type}
                    </p>
                    <Button color="red" icon onClick={() => props.deleteItem(props.id)}>
                        <Icon name="delete"/>
                    </Button>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

const Items = (props) => {
    return(
        <Segment inverted>
            <Grid stackable  divided className="ui center aligned grid">
                {props.items && props.items.length > 0 && props.items.map(({name,producer,value,description, _id,imageLink,itemType}) => (
                    <Item 
                        key={_id} 
                        id={_id}
                        name={name} 
                        producer={producer} 
                        value={value} 
                        description={description} 
                        image={imageLink}
                        type={itemType}
                        deleteItem={props.deleteItem}
                    />
                ))}
            </Grid>
                    {(!props.items || props.items.length === 0) && 
                    <Message size="massive"> Na tej stronie nie ma produktów.</Message>}
        </Segment>
    );
}

export default Items;