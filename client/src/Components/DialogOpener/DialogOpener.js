import { __extends } from "tslib";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewItemForm from "../NewItemForm/NewItemForm";
var DialogOpener = /** @class */ (function (_super) {
    __extends(DialogOpener, _super);
    function DialogOpener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
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
        return (React.createElement("div", null,
            React.createElement(Button, { variant: "outlined", color: "primary", onClick: this.handleClickOpen }, "Add New Data"),
            React.createElement(Dialog, { open: this.state.open, onClose: this.handleClose, "aria-labelledby": "form-dialog-title" },
                React.createElement(DialogTitle, { id: "form-dialog-title", style: { color: "black" } }, "Subscribe"),
                React.createElement(DialogContent, null,
                    React.createElement(DialogContentText, null, "To add new data, enter the details below."),
                    React.createElement(NewItemForm, { graphType: "line", label: this.props.graphType, caption: this.props.caption, addNewData: this.props.addNewData })),
                React.createElement(DialogActions, null,
                    React.createElement(Button, { onClick: this.handleClose, color: "primary" }, "Cancel"),
                    React.createElement(Button, { onClick: this.handleClose, color: "primary" }, "Subscribe")))));
    };
    return DialogOpener;
}(Component));
export default DialogOpener;
//# sourceMappingURL=DialogOpener.js.map