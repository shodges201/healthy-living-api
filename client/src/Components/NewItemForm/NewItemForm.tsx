import React, { Component } from 'react';
import DateSelector from '../DateSelector/DateSelector.js'
import TextInput from '../TextInput/TextInput.js';
import CompleteButton from '../CompleteButton/CompleteButton.js';
import './NewItemForm.css';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

interface NewItemFormProps{
    graphType?: string;
    caption: string | undefined;
    label: string | undefined;
    addNewData: Function;
}

interface NewItemFormState{
    date: Date;
    level: Number;
}

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

class NewItemForm extends Component<NewItemFormProps, NewItemFormState> {
    state = {
        date: new Date(),
        level: 0,
    }

    handleDate = (date: Date) => {
        this.setState({ date: date })
    }
    handleLevel = (level: any) => {
        level = level.target.value;
        if (level[level.length - 1] !== '0' && !Number(level[level.length - 1])) {
            level = level.substr(0, level.length - 1);
        }
        this.setState({ level: level });
    }
    handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        <DateSelector handleChange={this.handleDate} selectedDate={this.state.date} />
                        <TextInput label={`${this.props.label}`} value={this.state.level.toString()} handleChange={this.handleLevel} />
                        <CompleteButton handleForm={this.handleClick} />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default NewItemForm;