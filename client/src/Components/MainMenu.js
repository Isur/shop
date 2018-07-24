import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const MenuItem = (props) => {
    return(
        <Menu.Item> 
            <Link to={`/${props.funcParam}`}>  
                { props.ButtonText }
                <Icon size="small" name={props.icon}/>
            </Link>
        </Menu.Item>
    );
}

const MainMenu = (props) => {
    return(
        <Menu icon="labeled" inverted>
            <MenuItem funcParam="home" ButtonText="Home"  icon="home"/>
            <MenuItem funcParam="products" ButtonText="Produkty" icon="cart"/>
        </Menu> 
    )
}

export default MainMenu;