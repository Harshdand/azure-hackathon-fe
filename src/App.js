import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';

import Bank from './features/bank/bank';
import Govt from './features/govt/govt';
import User from './features/user/user';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/bank">
            <Bank />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/govt">
            <Govt />
          </Route>
          <Route path="*" render={() => <Redirect to="/user/login" />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
