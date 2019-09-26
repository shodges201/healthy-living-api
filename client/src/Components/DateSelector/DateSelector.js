import "date-fns";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers(props) {

  const handleDateChange = date => {
    props.handleChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Date"
      value={props.selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
    />
    </MuiPickersUtilsProvider>
  );
}