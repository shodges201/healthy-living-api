import { __extends } from "tslib";
import React, { Component } from 'react';
import './App.css';
import NavTabs from '../../Components/NavTabs/NavTabs';
import { Router, Route } from 'react-router-dom';
import Cholesterol from '../Cholesterol/Cholesterol.js';
import RestingHeartRate from '../RestingHeartRate/RestingHeartRate.js';
import Login from "../Login/Login.js";
import Home from '../Home/Home';
import Signup from "../Signup/Signup";
import history from "../../history.js";
var Background = "/images/darkBackground.jpg";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loggedIn: false,
            user: {}
        };
        _this.signIn = function (user) {
            console.log(user);
            console.log("logging in user");
            _this.setState({ user: user, loggedIn: true });
            history.push("/");
        };
        _this.checkUserStatus = function () {
            fetch("/api/user/sessionExpired")
                .then(function (resp) {
                if (!resp.ok) {
                    throw new Error('checking if user is still logged in failed');
                }
                return resp.json();
            })
                .then(function (data) {
                if (data.loggedIn) {
                    _this.setState({ user: data, loggedIn: true });
                }
            });
        };
        _this.logout = function () {
            fetch("/api/user/logout").
                then(function (resp) {
                if (!resp.ok) {
                    throw new Error('Logout attempt was not ok');
                }
                _this.setState({ loggedIn: false, user: {} });
            });
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.checkUserStatus();
    };
    // 
    App.prototype.componentWillUnmount = function () {
    };
    App.prototype.render = function () {
        var _this = this;
        if (!this.state.loggedIn) {
            return (React.createElement("div", { className: "background", style: { backgroundImage: "url(" + Background + ")" } },
                React.createElement(Router, { history: history },
                    React.createElement(NavTabs, { loggedIn: this.state.loggedIn }),
                    React.createElement(Route, { exact: true, path: "/", render: function () { return (React.createElement("div", { className: "Home" },
                            React.createElement(Home, null))); } }),
                    React.createElement(Route, { exact: true, path: "/Home", render: function () { return (React.createElement("div", { className: "Home" },
                            React.createElement(Home, null))); } }),
                    React.createElement(Route, { exact: true, path: "/Login", render: function () { return (React.createElement(Login, { signIn: _this.signIn, loggedIn: _this.state.loggedIn })); } }),
                    React.createElement(Route, { exact: true, path: "/Signup", component: Signup }))));
        }
        else {
            return (React.createElement("div", { className: "background", style: { backgroundImage: "url(" + Background + ")" } },
                React.createElement(Router, { history: history },
                    React.createElement(NavTabs, { logout: this.logout, loggedIn: this.state.loggedIn }),
                    React.createElement(Route, { exact: true, path: "/", render: function () { return (React.createElement("div", { className: "Home" },
                            React.createElement(Home, null))); } }),
                    React.createElement(Route, { exact: true, path: "/Home", render: function () { return (React.createElement("div", { className: "Home" },
                            React.createElement(Home, null))); } }),
                    React.createElement(Route, { exact: true, path: "/Cholesterol", render: function () { return (React.createElement(Cholesterol, { user: _this.state.user })); } }),
                    React.createElement(Route, { exact: true, path: "/RestingHeartRate", render: function () { return (React.createElement(RestingHeartRate, { user: _this.state.user })); } }))));
        }
    };
    return App;
}(Component));
export default App;
//# sourceMappingURL=App.js.map