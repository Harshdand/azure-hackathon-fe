import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from '../login/login';
import GovtDashboard from './govt-dashboard';

const Govt = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route
          path={`${path}/login`}
          render={(props) => (
            <Login {...props} type="govt" header="Govt Login" />
          )}
        />
        <Route
          path={`${path}/dashboard`}
          render={(props) => <GovtDashboard {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Govt;
