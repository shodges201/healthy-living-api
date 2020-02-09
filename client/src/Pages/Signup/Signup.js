import React, { Component } from 'react';
import './Signup.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";

class Signup extends Component {
    state = {
        username: "",
        password: "",
        validate: ""
    };

    handleChange = (event) => {
        let id = event.target.id.split("TextInput")[0];
        this.setState({[id]: event.target.value});
    }

    formSubmit = (event) => {
        console.log("submitted");
    }

    render() {
        return (
            <>
                <form onSubmit={(event) => this.formSubmit(event)}>
                    <TextInput label="username" value={this.state.username} handleChange={this.handleChange} />
                    <TextInput label="password" type="password" value={this.state.password} handleChange={this.handleChange} />
                    <TextInput label="validate" type="password" value={this.state.validate} handleChange={this.handleChange} />
                    <CompleteButton text="Sign Up" handleForm={this.formSubmit}/>
                </form>
            </>
        );
    }
}

export default Signup;