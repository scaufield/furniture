import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../ui/Pages/Home'
import Catalog from '../ui/Pages/Catalog'
import Cart from '../ui/Pages/Cart'
import Product from '../ui/Pages/Product'
import { Auth } from "../ui/Auth";
import { User } from '../ui/User'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/catalog/:slug' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/user' component={User}/>
        </Switch>
    )
}

export default Routes
