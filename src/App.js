import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Board from './components/Board/Board';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Layout from './hoc/Layout/Layout';

function App() {

  let routes = (
    <Switch>
      <Route path = '/leaderboard' component={Leaderboard} />
      <Route path = '/' component={Board} />
    </Switch>
  );

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
