import React from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js'
function App() {
  return (
    <div>
      <NavTabs/>
      <Router>
        <Route exact path="/Home"/>
        <Route exact path="/Cholesterol" component={Cholesterol}/>
        {/* <Route path="/"/> */}
      </Router>
    </div>
  );
}

export default App;
