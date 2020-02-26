import "date-fns";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './DateSelector.css';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

export default function DateSelector(props: {selectedDate?: Date, handleChange: Function, underlineColor: string}) {

  const theme = createMuiTheme({
    overrides: {
      MuiInput: {
        underline: {
          "&:after": {
            borderBottom: `2px solid ${props.underlineColor}`
          }
        }
      }
    }
  })

  const handleDateChange = (date: Date | null) => {
    props.handleChange(date);
  };

  return (
    
    <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date"
        format="MM/dd/yyyy"
        value={props.selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        className="date-selector"
      />
    </MuiPickersUtilsProvider >
    </MuiThemeProvider>
  );
}

DateSelector.defaultProps = {
  selectedDate: new Date(Date.now()),
  underlineColor: "grey"
}