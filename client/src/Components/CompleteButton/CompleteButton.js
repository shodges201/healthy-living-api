import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function CompleteButton(props) {
    const classes = useStyles();

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