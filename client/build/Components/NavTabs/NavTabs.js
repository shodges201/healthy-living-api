import { __assign } from "tslib";
import React from 'react';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
var styles = {
    whiteText: {
        color: "white"
    }
};
var theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiListItemText: {
            primary: {
                color: "black",
                paddingRight: "100px"
            }
        }
    }
});
export default function TemporaryDrawer(props) {
    console.log(props.loggedIn);
    var menuItems = props.loggedIn ? ['Home', 'Cholesterol', 'Resting Heart Rate'] : ['Home', 'Log In', 'Signup'];
    console.log(menuItems);
    var _a = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    }), state = _a[0], setState = _a[1];
    var sideList = function (side) { return (React.createElement("div", { role: "presentation", onClick: toggleDrawer(side, false), onKeyDown: toggleDrawer(side, false) },
        React.createElement(List, { style: { paddingTop: '0px' } }, menuItems.map(function (text, index) { return (React.createElement(Link, { to: text.split(' ').join(''), key: text },
            React.createElement(ListItem, { button: true },
                React.createElement(ListItemText, { primary: text })))); })))); };
    var toggleDrawer = function (side, open) { return function (event) {
        var _a;
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(__assign(__assign({}, state), (_a = {}, _a[side] = open, _a)));
    }; };
    console.log(props.loggedIn);
    if (!props.loggedIn) {
        return (React.createElement(MuiThemeProvider, { theme: theme },
            React.createElement("div", null,
                React.createElement(CssBaseline, null),
                React.createElement(AppBar, { position: "fixed" },
                    React.createElement(Toolbar, null,
                        React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: toggleDrawer('left', true), edge: "start" },
                            React.createElement(MenuIcon, null)),
                        React.createElement(Link, { to: "/", style: {
                                textDecoration: "none"
                            } },
                            React.createElement(Typography, { variant: "h5", style: styles.whiteText, noWrap: true }, "Healthy Life Style")),
                        React.createElement("div", { style: { marginLeft: "auto", display: "flex", flexDirection: "row" } },
                            React.createElement(Link, { to: "/Login", style: {
                                    textDecoration: "none", flexDirection: "row",
                                    display: "flex"
                                } },
                                React.createElement(Typography, { variant: "h5", style: styles.whiteText, noWrap: true }, "Login")),
                            React.createElement(Link, { to: "/Signup", style: { marginLeft: "30px", textDecoration: "none", display: "flex", flexDirection: "row" } },
                                React.createElement(Typography, { variant: "h5", style: styles.whiteText, noWrap: true }, "Signup"))))),
                React.createElement(Drawer, { open: state.left, onClose: toggleDrawer('left', false) }, sideList('left')))));
    }
    return (React.createElement(MuiThemeProvider, { theme: theme },
        React.createElement("div", null,
            React.createElement(CssBaseline, null),
            React.createElement(AppBar, { position: "fixed" },
                React.createElement(Toolbar, null,
                    React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: toggleDrawer('left', true), edge: "start" },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Link, { to: "/", style: { textDecoration: "none" } },
                        React.createElement(Typography, { variant: "h5", style: styles.whiteText, noWrap: true }, "Healthy Life Style")),
                    React.createElement("div", { style: { marginLeft: "auto" } },
                        React.createElement("a", { onClick: props.logout, style: { color: "white" } },
                            React.createElement(Typography, { variant: "h5", style: styles.whiteText, noWrap: true }, "Logout"))))),
            React.createElement(Drawer, { open: state.left, onClose: toggleDrawer('left', false) }, sideList('left')))));
}
//# sourceMappingURL=NavTabs.js.map