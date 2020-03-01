import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';
import Customers from '../pages/Customers';

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path='/' render={ () => <Dashboard /> } />
			<Route exact path='/accounts' render={ () => <Accounts /> } />
			<Route exact path='/customers' render={ () => <Customers /> } />
			<Route component={() => "404 NOT FOUND"} />
    </Switch>
  );
}

export default Routes;
