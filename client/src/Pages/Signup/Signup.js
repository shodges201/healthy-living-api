import { __extends } from "tslib";
import React, { Component } from 'react';
import './../Login/Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";
var Signup = /** @class */ (function (_super) {
    __extends(Signup, _super);
    function Signup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: "",
            username: "",
            password: "",
            validate: "",
            validPasswords: false
        };
        _this.handleChange = function (event, value) {
            var _a;
            _this.setState((_a = {}, _a[value] = event.target.value, _a));
        };
        _this.formSubmit = function (event) {
            console.log("submitted");
            var _a = _this.state, username = _a.username, email = _a.email, password = _a.password, validate = _a.validate;
            if (validate !== password) {
                return new Error("password isnt the same");
            }
            var body = {
                "email": email,
                "username": username,
                "password": password,
                "externalType": "native"
            };
            fetch("/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(function (resp) {
                if (!resp.ok) {
                    throw new Error('Login response was not ok');
                }
                return resp.json();
            }).then(function (userData) {
                _this.props.signIn(userData);
            }).catch(function (error) {
                console.log("Error:" + error);
            });
            return;
        };
        return _this;
    }
    Signup.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "containerInner" },
                React.createElement("form", { className: "form", onSubmit: function (event) { return _this.formSubmit(event); } },
                    React.createElement("div", { className: "formContainer" },
                        React.createElement("div", { className: "formItemContainer" },
                            React.createElement(TextInput, { className: "formItem", label: "email", type: "email", value: this.state.email, handleChange: function (event) { return _this.handleChange(event, "email"); } })),
                        React.createElement("div", { className: "formItemContainer" },
                            React.createElement(TextInput, { className: "formItem", label: "username", value: this.state.username, handleChange: function (event) { return _this.handleChange(event, "username"); } })),
                        React.createElement("div", { className: "formItemContainer" },
                            React.createElement(TextInput, { className: "formItem", label: "password", type: "password", value: this.state.password, handleChange: function (event) { return _this.handleChange(event, "password"); } })),
                        React.createElement("div", { className: "formItemContainer" },
                            React.createElement(TextInput, { className: "formItem", label: "password", type: "password", value: this.state.validate, handleChange: function (event) { return _this.handleChange(event, "validate"); } })),
                        React.createElement("div", { className: "formButtonContainer" },
                            React.createElement("div", { className: "formButtonInner" },
                                React.createElement(CompleteButton, { text: "Sign Up", handleForm: this.formSubmit, size: "medium", class: "button" }))))))));
    };
    return Signup;
}(Component));
export default Signup;
//# sourceMappingURL=Signup.js.map