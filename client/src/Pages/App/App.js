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
        console.log(user.uid);
        console.log(!!user);
        this.setState({ loggedIn: !!user, user: user})
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

  logout = () => {
    console.log(firebase.auth().currentUser);
    firebase.auth().signOut();
    this.setState({loggedIn: false, user: null});
    history.push('/Home');
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <Router history={history}>
            <NavTabs loggedIn={this.state.loggedIn}/>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Login" render={() => (
              <Login
                signIn={this.signIn}
                loggedIn={this.state.loggedIn}
              />)}
            />
            <Route exact path="/Signup" component={Signup} />
          </Router>
        </div>
      );
    }
    else{
  return(
  <div>
  <Router history={history}>
    <NavTabs logout={this.logout} loggedIn={this.state.loggedIn}/>
    <Route exact path="/Home" component={Home} />
    <Route exact path="/Login" render={() => (
      <Login
        signIn={this.signIn}
        loggedIn={this.state.loggedIn}
      />)}
    />
    <Route exact path="/Signup" component={Signup} />
    <Route exact path="/Cholesterol" render={() => (
      <Cholesterol
        user={this.state.user}
      />)}
    />
    <Route exact path="/RestingHeartRate" render={() => (
      <RestingHeartRate
        user={this.state.user}
      />)}
    />
  </Router>
  </div >);
  }
  }
}
