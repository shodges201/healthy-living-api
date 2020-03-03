import { __extends } from "tslib";
import React, { Component } from 'react';
import DateSelector from '../DateSelector/DateSelector.js';
import TextInput from '../TextInput/TextInput.js';
import CompleteButton from '../CompleteButton/CompleteButton.js';
import './NewItemForm.css';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
var theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiInput: {
            root: {
                // Name of the rule
                color: 'white',
                borderBottom: "2px solid white",
                "&$focused": {
                    color: 'white',
                    borderBottom: "2px solid white",
                },
            },
            underline: {
                color: 'white',
                borderBottom: "2px solid white",
                '&:before': {
                    borderBottom: "0px"
                },
                '&:after': {
                    borderBottom: "0px"
                },
                "&$focused": {
                    color: 'white',
                    borderBottom: "2px solid white",
                },
                '&:hover:not($disabled):after': {
                    borderBottom: "2px solid white",
                    transform: ""
                },
                '&:hover:not($disabled):before': {
                    borderBottom: "2px solid white",
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: 'white',
                "&$focused": {
                    color: 'white'
                }
            },
        },
        MuiInputLabel: {
            root: {
                color: 'white',
                "&$focused": {
                    color: 'white'
                },
            },
        },
        MuiIconButton: {
            root: {
                color: 'white',
            }
        },
        MuiInputAdornment: {
            root: {}
        },
        MuiInputBase: {
            root: {
                "&$focused": {
                    color: 'white',
                    borderBottom: "2px solid white",
                },
            }
        }
    },
});
var NewItemForm = /** @class */ (function (_super) {
    __extends(NewItemForm, _super);
    function NewItemForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: new Date(),
            level: 0,
        };
        _this.handleDate = function (date) {
            _this.setState({ date: date });
        };
        _this.handleLevel = function (level) {
            level = level.target.value;
            if (level[level.length - 1] !== '0' && !Number(level[level.length - 1])) {
                level = level.substr(0, level.length - 1);
            }
            _this.setState({ level: level });
        };
        _this.handleClick = function (event) {
            // add to database
            _this.props.addNewData(_this.state.date, _this.state.level, function () {
                _this.setState({ date: new Date(), level: 0 });
            });
        };
        return _this;
    }
    NewItemForm.prototype.render = function () {
        return (React.createElement(ThemeProvider, { theme: theme },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: 'root' },
                    React.createElement(DateSelector, { handleChange: this.handleDate, selectedDate: this.state.date }),
                    React.createElement(TextInput, { label: "" + this.props.label, value: this.state.level.toString(), handleChange: this.handleLevel }),
                    React.createElement(CompleteButton, { handleForm: this.handleClick })))));
    };
    return NewItemForm;
}(Component));
export default NewItemForm;
//# sourceMappingURL=NewItemForm.js.map