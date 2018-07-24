import React from 'react';
import { Message, Card, Icon, Image, Grid , Segment} from 'semantic-ui-react';
import image from '../images/placeholder-avatar.jpg';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return(
        <Grid.Column>
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
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

const Items = (props) => {
    return(
        <Segment inverted>
            <Grid columns='five' divided>
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
                    />
                ))}
            </Grid>
                    {(!props.items || props.items.length === 0) && 
                    <Message size="massive"> Na tej stronie nie ma produktów.</Message>}
        </Segment>
    );
}

export default Items;