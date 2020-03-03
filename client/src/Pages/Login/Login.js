import { __extends } from "tslib";
import * as React from 'react';
import './Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";
var styles = {
    container: {
        width: "60%",
        height: "100%",
        margin: "auto"
    },
    containerInner: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "calc(100% - 64px)",
        marginTop: "64px",
    },
    form: {},
    formContainer: {
        verticalAlign: "center",
    },
    formItemContainer: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    formButtonContainer: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    formItem: {
        margin: "auto",
        display: "flex",
        width: "50%"
    },
    formButtonInner: {
        width: "50%",
        display: "flex",
        justifyContent: "flex-end"
    },
};
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: "",
            password: ""
        };
        _this.handleChange = function (event) {
            var _a;
            var id = event.target.id.split("TextInput")[0];
            console.log(id);
            _this.setState((_a = {}, _a[id] = event.target.value, _a));
        };
        _this.formSubmit = function (event) {
            var _a = _this.state, email = _a.email, password = _a.password;
            var body = {
                "email": email,
                "password": password
            };
            console.log(body);
            fetch("/api/user/login", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(function (resp) {
                if (!resp.ok) {
                    throw new Error('Login response was not ok');
                }
                return resp.json();
            })
                .then(function (userData) {
                console.log(userData);
                _this.props.signIn(userData);
            })
                .catch(function (error) {
                console.log("Error:" + error);
            });
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.containerInner },
                React.createElement("form", { style: styles.form, onSubmit: function (event) { return _this.formSubmit(event); } },
                    React.createElement("div", { style: styles.formContainer },
                        React.createElement("div", { style: styles.formItemContainer },
                            React.createElement(TextInput, { style: styles.formItem, variant: "outlined", label: "email", type: "email", value: this.state.email, handleChange: function (event) { return _this.handleChange(event); } })),
                        React.createElement("div", { style: styles.formItemContainer },
                            React.createElement(TextInput, { style: styles.formItem, variant: "outlined", label: "password", type: "password", value: this.state.password, handleChange: function (event) { return _this.handleChange(event); } })),
                        React.createElement("div", { style: styles.formButtonContainer },
                            React.createElement("div", { style: styles.formButtonInner },
                                React.createElement(CompleteButton, { text: "Login", handleForm: this.formSubmit, size: "medium", class: "button" }))))))));
    };
    return Login;
}(React.Component));
export default Login;
//# sourceMappingURL=Login.js.map