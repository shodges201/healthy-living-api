import React, { Component } from 'react';
import './../Login/Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";

interface SignUpProps {
    signIn: Function;
    loggedIn: boolean;
}

interface SignUpState {
    email: string;
    username: string;
    password: string;
    validate: string;
    validPasswords: boolean;
}

const styles = {
    container: {
        width: "60%",
        height: "100%",
        margin: "auto"
    },
    containerInner: {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        height: "calc(100% - 64px)",
        marginTop: "64px",
    },
    form: {
    },
    formContainer: {
        verticalAlign: "center",

    },
    formItemContainer: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "center"
    },
    formButtonContainer: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "center"
    },
    formItem: {
        margin: "auto",
        display: "flex",
        width: "50%"
    },
    formButtonInner: {
        width: "50%",
        display: "flex",
        justifyContent: "flex-end"
    },
}

class Signup extends Component<SignUpProps, SignUpState> {
    state = {
        email: "",
        username: "",
        password: "",
        validate: "",
        validPasswords: false
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        this.setState({ [value]: event.target.value } as Pick<SignUpState, keyof SignUpState>);
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
        }).then(userData => {
            console.log(userData);
            this.props.signIn(userData);
        }).catch(error => {
            console.log("Error:" + error);
        })
        return;
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.containerInner}>
                    <form style={styles.form} onSubmit={(event) => this.formSubmit(event)}>
                        <div style={styles.formContainer}>
                            <div style={styles.formItemContainer}>
                                <TextInput style={styles.formItem} label="email" type="email" value={this.state.email} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "email" as any)} />
                            </div>
                            <div style={styles.formItemContainer}>
                                <TextInput style={styles.formItem} label="username" value={this.state.username} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "username" as any)} />
                            </div>
                            <div style={styles.formItemContainer}>
                                <TextInput style={styles.formItem} label="password" type="password" value={this.state.password} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "password" as any)} />
                            </div>
                            <div style={styles.formItemContainer}>
                                <TextInput style={styles.formItem} label="password" type="password" value={this.state.validate} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event, "validate" as any)} />
                            </div>
                            <div style={styles.formButtonContainer}>
                                <div style={styles.formButtonInner}>
                                    <CompleteButton text="Sign Up" handleForm={this.formSubmit} size="medium" class="button" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;