import React from 'react';
import { Icon, Menu, Flag } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

// language
import lang from './language/lang';

const MenuItem = (props) => {
    return(
        <Menu.Item> 
            <Link to={`/${props.funcParam}`}>  
                <Icon name={props.icon} />
                { props.ButtonText }
            </Link>
        </Menu.Item>
    );
}

const MainMenu = (props) => {
    return(
        <Menu icon="labeled" inverted>
            <MenuItem funcParam="home" ButtonText={lang.buttons.homePage}  icon="home"/>
            <MenuItem funcParam="products" ButtonText={lang.buttons.products} icon="cart"/>
            {props.logged && <MenuItem funcParam="products/add" ButtonText={lang.buttons.addProduct} icon="plus"/>}
            {!props.logged && <MenuItem funcParam="login" ButtonText={lang.buttons.login} icon="sign in"/>}
            {!props.logged && <MenuItem funcParam="register" ButtonText={lang.buttons.register} icon="signup"/>}
            {props.logged && <MenuItem funcParam="logout" ButtonText={lang.buttons.logout} icon="log out"/>}
            {props.logged && <MenuItem funcParam="profile" ButtonText={lang.buttons.profile} icon="user"/>}
            {props.logged && cookie.load('type')==='admin' && <MenuItem funcParam="users" ButtonText={lang.buttons.users} icon="users"/>}
            {props.logged && cookie.load('type')==='admin' && <MenuItem funcParam="logs" ButtonText={lang.buttons.logs} icon="book" />}
            <Menu.Item onClick={props.changeLanguage}position="right"> <Link to="/"> {cookie.load('language') === 'eng' && <Flag name="gb" />} {cookie.load('language') === 'pol' && <Flag name="pl" />}  </Link> </Menu.Item>
        </Menu> 
    )
}

export default MainMenu;