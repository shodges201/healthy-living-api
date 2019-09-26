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

export default function CompleteFunction(props) {
    const classes = useStyles();

    return (
        <Button onClick={props.handleForm} variant="contained" size="small" color="primary" className={classes.margin}>
            Create New Entry
        </Button>
    )
}