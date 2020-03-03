import React, { Component } from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js';
import RestingHeartRate from '../RestingHeartRate/RestingHeartRate.js';
import Login from "../Login/Login.js";
import Home from '../Home/Home';
import Signup from "../Signup/Signup";
import NoMatch from '../NoMatch/NoMatch';

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
  }

  checkUserStatus = () => {
    fetch(`/api/user/sessionExpired`)
      .then((resp) => {
        if (!resp.ok) {
          console.log("user error");
          return;
        }
        return resp.json();
      })
      .then(data => {
        if(!data){
          console.log("user not signed in");
          return;
        }
        if (data.loggedIn) {
          this.setState({ user: data, loggedIn: true })
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
    return (
      <div className="background">
        <BrowserRouter>
          <NavTabs logout={this.logout} loggedIn={this.state.loggedIn} />
          <Switch>
            <Route exact path="/" render={() => (
              <div className="Home">
                <Home />
              </div>
            )} />
            <Route exact path="/Login" render={() => (
              this.state.loggedIn ? <Redirect to="/" /> :
                <Login
                  signIn={this.signIn}
                  loggedIn={this.state.loggedIn}
                />)}
            />
            <Route exact path="/Signup" render={() => (
              this.state.loggedIn ? <Redirect to="/" /> :
              <Signup
                signIn={this.signIn}
                loggedIn={this.state.loggedIn}
              />)}
            />
            <Route exact path="/Cholesterol" render={() => (
              !this.state.loggedIn ? <Redirect to="/Login" /> :
              <Cholesterol
                user={this.state.user}
              />)}
            />
            <Route exact path="/RestingHeartRate" render={() => (
              !this.state.loggedIn ? <Redirect to="/Login" /> :
              <RestingHeartRate
                user={this.state.user}
              />)}
            />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </BrowserRouter>
      </div >);
  }
}
