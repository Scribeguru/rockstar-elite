import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Components/MainComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';


function App(props) {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
