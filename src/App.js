import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </div>
    );
  }
}
