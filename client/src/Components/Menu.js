import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const MenuItem = (props) => {
    return(
        <Menu.Item> 
        <Link to={{
            pathname: `/products/${props.funcParam}`,
            //search: '?page=1&sort=value',
        }}> {props.ButtonText} </Link>
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