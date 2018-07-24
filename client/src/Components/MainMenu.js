import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
const MenuItem = (props) => {
    return(
        <Menu.Item onClick={() => props.onClick(props.funcParam)}> 
            { props.ButtonText }
            <Icon size="small" name={props.icon}/>
        </Menu.Item>
    );
}

const MainMenu = (props) => {
    return(
        <Menu icon="labeled" inverted>
            <MenuItem funcParam="home" ButtonText="Home" onClick={props.selectRoute} icon="home"/>
            <MenuItem funcParam="products" ButtonText="Produkty" onClick={props.selectRoute} icon="cart"/>
            
        </Menu> 
    )
}

export default MainMenu;