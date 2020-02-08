import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';


const Routes = (props) => {

  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path='/' render={ () => <Dashboard /> } />
			<Route exact path='/accounts' render={ () => <Accounts /> } />
      {/* <Route exact path='/' render={ () => !props.isLoggedIn ? <Login /> :  <Dashboard /> } /> */}

      {/* <PrivateRoutes>
        <Switch>
          <Route exact path="/contacts" component={Contacts} />
          <Route component={() => "404 NOT FOUND"} />
        </Switch>
      </PrivateRoutes> */}
    </Switch>
  );
}

export default Routes;

// const mapStateToProps = state => ({
//   isLoggedIn: state.Auth.isLoggedIn,
//   user: state.Auth.user
// });

// export default connect(
//   mapStateToProps
// )(withRouter(Routes));
