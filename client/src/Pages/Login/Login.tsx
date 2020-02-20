import * as React from 'react';
import './Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";

interface LoginProps{
  signIn: Function;
  loggedIn?: boolean;
}

interface LoginState{

}

class Login extends React.Component<LoginProps, LoginState>{
    state = {
        email: "",
        password: ""
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let id = event.target.id.split("TextInput")[0];
        console.log(id);
        this.setState({[id]: event.target.value});
    }

    formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {email, password} = this.state;
        const body = {
          "email": email,
          "password": password
        }
        console.log(body);
        fetch("/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }).then((resp) => {
          if(!resp.ok){
            throw new Error('Login response was not ok');
          }
          return resp.json();
        })
        .then((userData) => {
          console.log(userData);
          this.props.signIn(userData);
        })
        .catch((error) => {
          console.log("Error:" + error);
        })
    }

    render() {
        return (
            <div className="container">
                <form className="form" onSubmit={(event) => this.formSubmit(event)}>
                    <TextInput variant="outlined" label="email" type="email" value={this.state.email} handleChange={this.handleChange}/>
                    <TextInput variant="outlined" label="password" type="password" value={this.state.password} handleChange={this.handleChange}/>
                    <CompleteButton text="Login" handleForm={this.formSubmit} size="medium" class="button"/>
                </form>
            </div>
        );
    }
}

export default Login;