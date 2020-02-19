import "date-fns";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './DateSelector.css';

export default function MaterialUIPickers(props: {selectedDate?: string | null, handleChange: Function}) {

  const handleDateChange = (date: Date | null) => {
    props.handleChange(date);
  };

  return (
    
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
  );
}