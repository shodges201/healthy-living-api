import "date-fns";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import './DateSelector.css';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
export default function DateSelector(props) {
    var theme = createMuiTheme({
        overrides: {
            MuiInput: {
                underline: {
                    "&:after": {
                        borderBottom: "2px solid " + props.underlineColor
                    }
                }
            }
        }
    });
    var handleDateChange = function (date) {
        props.handleChange(date);
    };
    return (React.createElement(MuiThemeProvider, { theme: theme },
        React.createElement(MuiPickersUtilsProvider, { utils: DateFnsUtils },
            React.createElement(KeyboardDatePicker, { margin: "normal", id: "date-picker-dialog", label: "Date", format: "MM/dd/yyyy", value: props.selectedDate, onChange: handleDateChange, KeyboardButtonProps: {
                    "aria-label": "change date"
                }, className: "date-selector" }))));
}
DateSelector.defaultProps = {
    selectedDate: new Date(Date.now()),
    underlineColor: "grey"
};
//# sourceMappingURL=DateSelector.js.map