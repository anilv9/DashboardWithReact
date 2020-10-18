import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Main from './components/Main/Main.js'
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Redirect exact path="/" to="/Discover"  />
        <Route path="/TestReports" component={Main} />
        <Route path="/Discover" component={Main} />
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

