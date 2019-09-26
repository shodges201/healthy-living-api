import React from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js';
import RestingHeartRate from '../RestingHeartRate/RestingHeartRate.js';


function App() {
  return (
    <div>
      <Router>
        <NavTabs />
        <Route exact path="/Home" />
        <Route exact path="/Cholesterol" component={Cholesterol} />
        <Route exact path="/RestingHeartRate" component={RestingHeartRate} />
      </Router>
    </div>
  );
}

export default App;
