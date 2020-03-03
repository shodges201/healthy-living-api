import { __extends } from "tslib";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import NewItemForm from "../NewItemForm/NewItemForm";
import DateSelector from "../DateSelector/DateSelector";
import TextInput from "../TextInput/TextInput";
var DialogOpener = /** @class */ (function (_super) {
    __extends(DialogOpener, _super);
    function DialogOpener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            date: new Date(Date.now()),
            amount: 0
        };
        _this.handleLevel = function (event) {
            var re = /^[0-9\b]+$/;
            if (event.target.value === '' || re.test(event.target.value)) {
                _this.setState({ amount: Number(event.target.value) });
            }
        };
        _this.handleDate = function (date) {
            _this.setState({ date: date });
        };
        _this.handleClickOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleClose = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    DialogOpener.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { marginTop: "30px", width: "100%", display: "flex", justifyContent: "center" } },
            React.createElement(Button, { variant: "contained", color: "default", onClick: this.handleClickOpen }, "Add New Data"),
            React.createElement(Dialog, { open: this.state.open, onClose: this.handleClose, "aria-labelledby": "form-dialog-title" },
                React.createElement(DialogTitle, { id: "form-dialog-title", style: { color: "black" } }, "Add New Data"),
                React.createElement(DialogContent, null,
                    React.createElement(DialogContentText, null, "To add new data, enter the details below."),
                    React.createElement("div", { style: { width: "100%", marginBottom: "30px" } },
                        React.createElement(DateSelector, { handleChange: this.handleDate, selectedDate: this.state.date })),
                    React.createElement("div", { style: { width: "100%" } },
                        React.createElement(TextInput, { label: "" + this.props.label, value: this.state.amount.toString(), handleChange: this.handleLevel, textColor: "black", backgroundColor: "white", borderColor: "grey", focusedBorderColor: "grey" }))),
                React.createElement(DialogActions, null,
                    React.createElement(Button, { onClick: this.handleClose, color: "primary" }, "Cancel"),
                    React.createElement(Button, { onClick: function () { return _this.props.submitNewEntry(_this.state.date, _this.state.amount, _this.handleClose); }, color: "primary" }, "Confirm")))));
    };
    return DialogOpener;
}(Component));
export default DialogOpener;
//# sourceMappingURL=DialogOpener.js.map