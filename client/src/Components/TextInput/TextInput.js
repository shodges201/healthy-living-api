import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
function TextInput(props) {
    var theme = createMuiTheme({
        overrides: {
            MuiInputLabel: {
                root: {
                    color: props.textColor,
                    "&$focused": {
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
    });
    function variantTypingHack() {
        switch (props.variant) {
            case "standard":
                return (React.createElement(TextField, { id: props.label + "TextInput", label: props.label, value: props.value, type: props.type, variant: "standard", style: props.style, onChange: function (event) { return props.handleChange(event); } }));
            case "filled":
                return (React.createElement(TextField, { id: props.label + "TextInput", label: props.label, value: props.value, type: props.type, variant: "filled", style: props.style, onChange: function (event) { return props.handleChange(event); } }));
            case "outlined":
                return (React.createElement(TextField, { id: props.label + "TextInput", label: props.label, value: props.value, type: props.type, variant: "outlined", onChange: function (event) { return props.handleChange(event); }, style: props.style }));
            default:
                return (React.createElement(TextField, { id: props.label + "TextInput", label: props.label, value: props.value, type: props.type, variant: "standard", style: props.style, onChange: function (event) { return props.handleChange(event); } }));
        }
    }
    return (React.createElement(MuiThemeProvider, { theme: theme }, variantTypingHack()));
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
    handleChange: function (event) {
        return event.target.value;
    }
};
export default TextInput;
//# sourceMappingURL=TextInput.js.map