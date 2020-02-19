import * as React from 'react';
import Button from '@material-ui/core/Button';

function CompleteButton(props: {text: string, class: string, size:"small" | "medium" | "large" | undefined, handleForm: Function}) {
    console.log(props.class);
    return (
        <Button onClick={(event) => props.handleForm(event)} variant="contained" size={props.size} color="primary" className={props.class}>
            {props.text}
        </Button>
    )
}

CompleteButton.defaultProps = {
    text: "Create New Entry",
    class: "button",
    size: "small"
  };

export default CompleteButton;