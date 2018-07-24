import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Products from './Products';
import Item from './Item';
const Router = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home} />
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