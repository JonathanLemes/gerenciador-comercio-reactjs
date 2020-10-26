import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import LoginScreen from './pages/LoginScreen';
import MapScreen from './pages/MapScreen';
import AddOrder from './pages/AddOrder';
import ViewOrder from './pages/ViewOrder';
import AddClient from './pages/AddClient';
import OrdersHistory from './pages/OrdersHistory';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={LoginScreen} />
                <Route path="/map" exact component={MapScreen} />
                <Route path="/add-order/:id" component={AddOrder} />
                <Route path="/view-order/:id" component={ViewOrder} />
                <Route path="/clients/add" exact component={AddClient} />
                <Route path="/orders" exact component={OrdersHistory} />
                <Route component={Landing} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;