import { __extends } from "tslib";
import React, { Component } from 'react';
var styles = {
    container: {
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: "3fr 2fr"
    },
    welcome: {
        color: "white",
        textAlign: "center",
        fontSize: "30px",
        alignSelf: "center"
    },
    welcomeHeader: {
        marginTop: "0px",
        marginBottom: "10px"
    },
    welcomeDescription: {
        marginTop: "10px",
        marginBottom: "0px"
    },
    explanation: {
        background: "white",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridColumnGap: "auto"
    },
    explanationInner: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: "25px"
    }
};
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
        return (React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.welcome },
                React.createElement("h1", { style: styles.welcomeHeader }, "Welcome to Healthy Living"),
                React.createElement("h5", { style: styles.welcomeDescription }, "An Application to track health markers like cholesterol and resting heart rate over time for a healthier lifestyle.")),
            React.createElement("div", { style: styles.explanation },
                React.createElement("div", { style: styles.explanationInner }, "Sign in"),
                React.createElement("div", { style: styles.explanationInner }, "View existing data"),
                React.createElement("div", { style: styles.explanationInner }, "Or add new data"))));
    };
    return Home;
}(Component));
export default Home;
//# sourceMappingURL=Home.js.map