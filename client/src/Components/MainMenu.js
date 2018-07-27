import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


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
            <MenuItem funcParam="home" ButtonText="Home"  icon="home"/>
            <MenuItem funcParam="products" ButtonText="Produkty" icon="cart"/>
            {props.logged && <MenuItem funcParam="products/add" ButtonText="Dodaj Produkt" icon="plus"/>}
            {!props.logged && <MenuItem funcParam="login" ButtonText="Login" icon="sign in"/>}
            {!props.logged && <MenuItem funcParam="register" ButtonText="Rejestracja" icon="signup"/>}
            {props.logged && <MenuItem funcParam="logout" ButtonText="Wyloguj" icon="log out"/>}
            {props.logged && <MenuItem funcParam="profile" ButtonText="Profil" icon="user"/>}
        </Menu> 
    )
}

export default MainMenu;