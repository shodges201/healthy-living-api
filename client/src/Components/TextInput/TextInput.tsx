import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

function TextInput(props: {
  id: string, label: string, value: string, type: string, class: string, variant: ("standard" | "outlined" | "filled"), textColor: string,
  backgroundColor: string, borderColor: string, focusedBorderColor: string, handleChange: Function, style?: any}) {

  const theme = createMuiTheme({
    overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          color: props.textColor,
          "&$focused": { // increase the specificity for the pseudo class
            color: props.textColor
          }
        }
      },
      MuiInputBase: {
        input: {
          color: props.textColor,
          background: props.backgroundColor
        }
      },
      MuiOutlinedInput: {
        root: {
          //borderColor: "white",
          '&$focused $notchedOutline': {
            borderColor: props.focusedBorderColor,
          },
        },
        notchedOutline: {
          borderColor: props.borderColor
        }
      }
    }
  })

  function variantTypingHack() {
    switch (props.variant) {
      case "standard":
        return (<TextField
          id={`${props.label}TextInput`}
          label={props.label}
          value={props.value}
          type={props.type}
          variant={"standard"}
          style = {props.style}
          onChange={(event) => props.handleChange(event)}
        />)
      case "filled":
        return (<TextField
          id={`${props.label}TextInput`}
          label={props.label}
          value={props.value}
          type={props.type}
          variant={"filled"}
          style = {props.style}
          onChange={(event) => props.handleChange(event)}
        />)
      case "outlined":
        return(<TextField
          id={`${props.label}TextInput`}
          label={props.label}
          value={props.value}
          type={props.type}
          variant={"outlined"}
          onChange={(event) => props.handleChange(event)}
          style = {props.style}
        />)

    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      {variantTypingHack()}
    </MuiThemeProvider>
  )
}

TextInput.defaultProps = {
  id: "",
  label: "",
  value: "",
  type: "text",
  class: "textField",
  variant: "outlined",
  textColor: "white",
  backgroundColor: "grey",
  borderColor: "grey",
  focusedBorderColor: "white",
  handleChange: function (event: React.ChangeEvent<HTMLInputElement>) {
    return event.target.value;
  }
};

export default TextInput;