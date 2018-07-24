import React from 'react';
import { Menu } from 'semantic-ui-react';
const MenuItem = (props) => {
    return(
        <Menu.Item onClick={() => props.onClick(props.funcParam)}> 
            { props.ButtonText }
        </Menu.Item>
    );
}



const MyMenu = (props) => {
    return(
        <Menu inverted fluid widths={6} size="massive">
            <MenuItem funcParam="all" ButtonText="Wszystko" onClick={props.selectCategory} />            
            <MenuItem funcParam="cameras" ButtonText="Kamery" onClick={props.selectCategory} />            
            <MenuItem funcParam="tvs" ButtonText="TV" onClick={props.selectCategory} />            
            <MenuItem funcParam="computers" ButtonText="Komputery" onClick={props.selectCategory} />            
            <MenuItem funcParam="phones" ButtonText="Telefony" onClick={props.selectCategory} />
        </Menu> 
    );
}

export default MyMenu;