import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from '../login/login';
import BankDashboard from './bank-dashboard';

const Bank = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route
          path={`${path}/login`}
          render={(props) => (
            <Login {...props} type="bank" header="Bank Login" />
          )}
        />
        <Route
          path={`${path}/dashboard`}
          render={(props) => <BankDashboard {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Bank;
