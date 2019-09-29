import React from 'react';
import Button from '@material-ui/core/Button';

export default function CompleteButton(props) {
    console.log(props.class);
    return (
        <Button onClick={props.handleForm} variant="contained" size={props.size} color="primary" className={props.class}>
            {props.text}
        </Button>
    )
}

CompleteButton.defaultProps = {
    text: "Create New Entry",
    class: "button",
    size: "small"
  };