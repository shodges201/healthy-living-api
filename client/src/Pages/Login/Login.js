import React, { Component } from 'react';
import './Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";

class Login extends Component {
    state = {
        username: "",
        password: ""
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
            <div className="container">
                <form className="form">
                    <TextInput label="username" value={this.state.username} handleChange={this.handleChange} class="formItem"/>
                    <TextInput label="password" type="password" value={this.state.password} handleChange={this.handleChange} class="formItem"/>
                    <CompleteButton text="Sign Up" handleForm={this.formSubmit} size="medium" class="button"/>
                </form>
            </div>
        );
    }
}

export default Login;