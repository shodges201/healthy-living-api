import "date-fns";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import './DateSelector.css';
export default function MaterialUIPickers(props) {
    var handleDateChange = function (date) {
        props.handleChange(date);
    };
    return (React.createElement(MuiPickersUtilsProvider, { utils: DateFnsUtils },
        React.createElement(KeyboardDatePicker, { margin: "normal", id: "date-picker-dialog", label: "Date", format: "MM/dd/yyyy", value: props.selectedDate, onChange: handleDateChange, KeyboardButtonProps: {
                "aria-label": "change date"
            }, className: "date-selector" })));
}
//# sourceMappingURL=DateSelector.js.map