import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';
import Customers from '../pages/Customers';
import CustomerOverview from '../pages/CustomerOverview';
import Purchases from '../pages/Purchases';
import Sales from '../pages/Sales';

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path='/' component={Dashboard} />
			<Route exact path='/accounts' component={Accounts} />
			<Route exact path='/customers' component={Customers} />
			<Route path='/customers/view/:id' component={CustomerOverview} />
			<Route exact path='/purchases' component={Purchases} />
			<Route exact path='/sales' component={Sales} />
			<Route component={() => "404 NOT FOUND"} />
    </Switch>
  );
}

export default Routes;
