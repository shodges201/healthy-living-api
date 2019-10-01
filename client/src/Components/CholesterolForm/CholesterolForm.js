import React, { Component } from 'react';
import DateSelector from '../DateSelector/DateSelector.js'
import TextInput from '../TextInput/TextInput.js';
import CompleteButton from '../CompleteButton/CompleteButton.js';
import './CholesterolForm.css';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { isWithinInterval } from 'date-fns/esm';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiInput: {
            root: {
                // Name of the rule
                color: 'white',
                borderBottom: `2px solid white`,
                "&$focused": {
                    color: 'white',
                    borderBottom: `2px solid white`,
                },
            },
            underline: {
                color: 'white',
                borderBottom: `2px solid white`,
                '&:before': {
                    borderBottom: "0px"
                },
                '&:after': {
                    borderBottom: "0px"
                },
                "&$focused": {
                    color: 'white',
                    borderBottom: `2px solid white`,
                },
                '&:hover:not($disabled):after': {
                    borderBottom: `2px solid white`,
                    transform: ""
                },
                '&:hover:not($disabled):before': {
                    borderBottom: `2px solid white`,          // String should be terminated
                },
              },
        },
        MuiFormLabel: {
            root: {
                color: 'white',
                "&$focused": {
                    color: 'white'
                }
            },

        },
        MuiInputLabel: {
            root: {
                color: 'white',
                "&$focused": {
                    color: 'white'
                },
            },

        },
        MuiIconButton: {
            root: {
                color: 'white',
            }
        },
        MuiInputAdornment: {
            root: {
            }
        },
        MuiInputBase: {
            root: {
                "&$focused": {
                    color: 'white',
                    borderBottom: `2px solid white`,
                },
            }
        }
    },
});

class CholesterolForm extends Component {
    state = {
        date: new Date(),
        level: 0,
    }

    handleDate = date => {
        this.setState({ date: date })
    }
    handleLevel = level => {
        level = level.target.value;
        if (level[level.length - 1] !== '0' && !Number(level[level.length - 1])) {
            console.log(level[level.length - 1]);
            level = level.substr(0, level.length - 1);
        }
        this.setState({ level: level });
    }
    handleClick = event => {
        // add to database
        this.props.addNewData(this.state.date, this.state.level, () => {
            this.setState({ date: new Date(), level: 0 })
        });
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="container">
                    <div className='root'>
                        <DateSelector handleChange={this.handleDate} selectedDate={this.state.date.toDateString()} />
                        <TextInput label="cholesterol level" value={this.state.level} handleChange={this.handleLevel} />
                        <CompleteButton handleForm={this.handleClick} />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default CholesterolForm;