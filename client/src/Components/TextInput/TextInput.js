import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {
    
    return (
        <TextField
          id={`${props.label}TextInput`}
          label={props.label}
          className="textField"
          value={props.value}
          type={props.type}
          onChange={(event)=>props.handleChange(event)}
        />
    )
}

TextInput.defaultProps = {
  id: "",
  label: "",
  value: "",
  type: "text",
  handleChange: function(event) {
    return event.target.value;
  }
};