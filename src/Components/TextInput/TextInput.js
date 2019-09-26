import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

export default function TextInput(props) {
    const classes = useStyles();
    return (
        <TextField
          id={`${props.label}TextInput`}
          label={props.label}
          className={classes.textField}
          value={props.level}
          onChange={(event)=>props.handleChange(event.target.value)}
          margin="normal"
        />
    )
}