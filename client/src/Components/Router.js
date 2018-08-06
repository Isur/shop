// 
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Home from './Home';
import NotFound from './NotFound';
import Products from './Products';
import Item from './Item';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import AddNew from './AddNew';
import Profile from './Profile';
import Users from './Users';
// ROUTER
const Router = (props) => {
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" render={() => <Login login={props.login}/>}/>
            <Route exact path="/logout" render={() => <Logout logout={props.logout}/>}/>
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" render={() => <Profile/>} />
            <Route exact path="/users" render={() => <Users/>} />
            <Route exact path="/products/add" component={AddNew}  token={props.token}/>
            <Route exact path="/products" render={() => <Products category="all"/>} />
            <Route exact path="/products/item/" render={() => <Item />} />
            <Route exact path='/products/all' render={() => <Products key={'all'} category="all"/>} />
            <Route exact path='/products/cameras' render={() => <Products key={'cam'} category="cameras"/>} />
            <Route exact path='/products/tvs' render={() => <Products key={'tv'} category="tvs"/>} />
            <Route exact path='/products/phones' render={() => <Products key={'phone'} category="phones"/>} />
            <Route exact path='/products/computers' render={() => <Products key={'pc'} category="computers"/>} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Router;