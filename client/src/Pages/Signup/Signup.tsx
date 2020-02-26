import React, { Component } from 'react';
import './../Login/Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";

class Signup extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        validate: "",
        validPasswords: false
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        this.setState({ [value]: event.target.value });
    }

    formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submitted");
        const { username, email, password, validate } = this.state;
        if (validate !== password) {
            return new Error("password isnt the same");
        }
        const body = {
            "email": email,
            "username": username,
            "password": password,
            "externalType": "native"
        }
        console.log(body);
        fetch("/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error('Login response was not ok');
            }
            return resp.json();
        })
        return;
    }

    render() {
        return (
            <div className="container">
                <form className="form" onSubmit={(event) => this.formSubmit(event)}>
                    <TextInput label="email" type="email" value={this.state.email} handleChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.handleChange(event, "email")} />
                    <TextInput label="username" value={this.state.username} handleChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.handleChange(event, "username")} />
                    <TextInput label="password" type="password" value={this.state.password} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "password")} />
                    <TextInput label="password" type="password" value={this.state.validate} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "validate")} />
                    <CompleteButton text="Sign Up" handleForm={this.formSubmit} />
                </form>
            </div>
        );
    }
}

export default Signup;