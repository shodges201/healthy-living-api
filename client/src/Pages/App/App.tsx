import React, { Component } from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { Router, Route } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js';
import RestingHeartRate from '../RestingHeartRate/RestingHeartRate.js';
import Login from "../Login/Login.js";
import Home from '../Home/Home';
import Signup from "../Signup/Signup";
import history from "../../history.js";

interface AppProps {
}

interface AppState {
  loggedIn: boolean;
  user: {
    username?: string;
    email?: string;
    id?: string;
  };
}

const Background = "/images/darkBackground.jpg"

export default class App extends Component<AppProps, AppState> {
  state = {
    loggedIn: false,
    user: {}
  };

  componentDidMount() {
    this.checkUserStatus();
  }

  // 
  componentWillUnmount() {
  }

  signIn = (user: AppState["user"]) => {
    console.log(user);
    console.log("logging in user");
    this.setState({ user: user, loggedIn: true });
    history.push("/");
  }

  checkUserStatus = () => {
    fetch(`/api/user/sessionExpired`)
      .then((resp) => {
        if (!resp.ok) {
          console.log("user not signed in");
          return;
        }
        return resp.json();
      })
      .then(data => {
        if(data.loggedIn){
          this.setState({user: data, loggedIn: true})
        }
      })
  }

  logout = () => {
    fetch("/api/user/logout").
      then((resp) => {
        if (!resp.ok) {
          throw new Error('Logout attempt was not ok');
        }
        this.setState({ loggedIn: false, user: {} })
      })
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="background" style={{ backgroundImage: `url(${Background})` }}>
          <Router history={history}>
            <NavTabs loggedIn={this.state.loggedIn} />
            <Route exact path="/" render={() => (
              <div className="Home">
                <Home />
              </div>
            )} />
            <Route exact path="/Home" render={() => (
              <div className="Home">
                <Home />
              </div>
            )} />
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
    else {
      return (
        <div className="background" style={{ backgroundImage: `url(${Background})` }}>
          <Router history={history}>
            <NavTabs logout={this.logout} loggedIn={this.state.loggedIn} />
            <Route exact path="/" render={() => (
              <div className="Home">
                <Home />
              </div>
            )} />
            <Route exact path="/Home" render={() => (
              <div className="Home">
                <Home />
              </div>
            )} />
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
