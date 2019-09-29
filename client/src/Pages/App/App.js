import React, { Component } from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js';
import RestingHeartRate from '../RestingHeartRate/RestingHeartRate.js';
import Login from "../Login/Login.js";
import Home from '../Home/Home';
import Signup from "../Signup/Signup";
import firebase from '../../firebase';
import history from '../../history';

export default class App extends Component {
  state = {
    loggedIn: false,
    user: null
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          console.log(user);
          console.log(!!user);
          this.setState({loggedIn: !!user})
        }
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  signIn = (user, cb) => {
    console.log(user);
    this.setState({ user: user, loggedIn: true });
    cb();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <NavTabs />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Login" render={() => (
            <Login
              signIn={this.signIn}
              loggedIn={this.state.loggedIn}
            />)} 
            />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Cholesterol" component={Cholesterol} />
            <Route exact path="/RestingHeartRate" component={RestingHeartRate} />
        </Router>
      </div>
        );
      }
    }
