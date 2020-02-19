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
        _this.handleChange = function (event) {
            var _a;
            var id = event.target.id.split("TextInput")[0];
            _this.setState((_a = {}, _a[id] = event.target.value, _a));
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
            console.log(body);
            fetch("/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(function (resp) {
                if (!resp.ok) {
                    throw new Error('Login response was not ok');
                }
                return resp.json();
            });
            return;
        };
        return _this;
    }
    Signup.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "container" },
            React.createElement("form", { className: "form", onSubmit: function (event) { return _this.formSubmit(event); } },
                React.createElement(TextInput, { label: "email", type: "email", value: this.state.email, handleChange: this.handleChange }),
                React.createElement(TextInput, { label: "username", value: this.state.username, handleChange: this.handleChange }),
                React.createElement(TextInput, { label: "password", type: "password", value: this.state.password, handleChange: this.handleChange }),
                React.createElement(TextInput, { label: "validate", type: "password", value: this.state.validate, handleChange: this.handleChange }),
                React.createElement(CompleteButton, { text: "Sign Up", handleForm: this.formSubmit }))));
    };
    return Signup;
}(Component));
export default Signup;
//# sourceMappingURL=Signup.js.map