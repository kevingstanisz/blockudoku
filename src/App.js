import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board/Board';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  return (
    <Switch>
      <Route path = '/leaderboard' component={Leaderboard} />
      <Route path = '/' component={Board} />
    </Switch>
  );
}

export default App;
