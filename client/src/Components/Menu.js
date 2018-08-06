import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// language
import lang from './language/lang';

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
            <MenuItem funcParam="all" ButtonText={lang.productTypes.all} onClick={props.selectCategory} />            
            <MenuItem funcParam="cameras" ButtonText={lang.productTypes.cameras} onClick={props.selectCategory} />            
            <MenuItem funcParam="tvs" ButtonText={lang.productTypes.tvs} onClick={props.selectCategory} />            
            <MenuItem funcParam="computers" ButtonText={lang.productTypes.computers} onClick={props.selectCategory} />            
            <MenuItem funcParam="phones" ButtonText={lang.productTypes.phones} onClick={props.selectCategory} />
        </Menu> 
    );
}

export default MyMenu;