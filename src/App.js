import React from 'react';
import {Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board/Board';

function App() {
  return (
    <React.Fragment>
      <Route path = '/' component={Board} />
    </React.Fragment>
  );
}

export default App;
