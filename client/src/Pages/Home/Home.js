import { __extends } from "tslib";
import React, { Component } from 'react';
import "./Home.css";
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.componentDidMount = function () {
        };
        return _this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "welcome" },
                React.createElement("h1", { className: "welcomeHeader" }, "Healthy Living"),
                React.createElement("h5", { className: "welcomeDescription" }, "An Application to track health markers like cholesterol and resting heart rate over time for a healthier lifestyle.")),
            React.createElement("div", { className: "explanation" },
                React.createElement("div", { className: "explanationInner" }, "Sign in"),
                React.createElement("div", { className: "explanationInner" }, "View existing data"),
                React.createElement("div", { className: "explanationInner" }, "Or add new data"))));
    };
    return Home;
}(Component));
export default Home;
//# sourceMappingURL=Home.js.map