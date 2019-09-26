import React, { Component } from 'react';
import DateSelector from '../DateSelector/DateSelector.js'
import TextInput from '../TextInput/TextInput.js';
import CompleteButton from '../CompleteButton/CompleteButton.js'

class CholesterolForm extends Component {
    state = {
        date: new Date(),
        level: 0,
    }
    handleDate = date => {
        this.setState({ date: date })
    }
    handleLevel = level => {
        console.log(level);
        if(!Number(level[level.length-1])){
            console.log(level[level.length-1]);
            level = level.substr(0, level.length-1);
        }
        this.setState({ level: level });
    }
    handleClick = event => { 
        // add to database
        this.setState({date: new Date(), level: 0})
    }
    render() {
        return (
            <>
                <DateSelector handleChange={this.handleDate} selectedDate={this.state.date.toDateString()}/>
                <TextInput label="cholesterol level" level={this.state.level} handleChange={this.handleLevel} />
                <CompleteButton handleForm={this.handleClick}/>
            </>
        );
    }
}

export default CholesterolForm;