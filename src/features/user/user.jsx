import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from '../login/login';
import UserDashboard from './user-dashboard';

const User = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route
          path={`${path}/login`}
          render={(props) => (
            <Login {...props} type="user" header="User Login" />
          )}
        />
        <Route
          path={`${path}/dashboard`}
          render={(props) => <UserDashboard {...props} />}
        />
      </Switch>
    </div>
  );
};

export default User;
