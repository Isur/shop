import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
const MenuItem = (props) => {
    return(
        <Menu.Item onClick={() => props.onClick(props.funcParam)}> 
            { props.ButtonText }
        </Menu.Item>
    );
}

const MainMenu = (props) => {
    return(
        <Menu inverted fluid width={6} size="small">
            <MenuItem funcParam="home" ButtonText="Home" onClick={props.selectRoute}/>
            <MenuItem funcParam="products" ButtonText="Produkty" onClick={props.selectRoute}/>
        </Menu> 
    )
}

export default MainMenu;