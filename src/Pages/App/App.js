import React from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sample from '../../Components/sample/sample'
function App() {
  return (
    <div>
      <NavTabs/>
      <Router>
        <Route exact path="/" component={Sample}/>
        <Route exact path="/else" component={Sample}/>
      </Router>
    </div>
  );
}

export default App;
