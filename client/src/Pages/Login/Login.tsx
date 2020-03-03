import * as React from 'react';
import './Login.css';
import TextInput from "../../Components/TextInput/TextInput";
import CompleteButton from "../../Components/CompleteButton/CompleteButton";
import "./Login.css";

interface LoginProps {
  signIn: Function;
  loggedIn?: boolean;
}

interface LoginState {

}


class Login extends React.Component<LoginProps, LoginState>{
  state = {
    email: "",
    password: ""
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let id = event.target.id.split("TextInput")[0];
    console.log(id);
    this.setState({ [id]: event.target.value });
  }

  formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
    const body = {
      "email": email,
      "password": password
    }
    console.log(body);
    fetch("/api/user/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then((resp) => {
      if (!resp.ok) {
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
        <div className="containerInner">
          <form onSubmit={(event) => this.formSubmit(event)}>
            <div className="formContainer">
              <div className="formItemContainer">
                <TextInput className="formItem" variant="outlined" label="email" type="email" value={this.state.email} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)} />
              </div>
              <div className="formItemContainer">
                <TextInput className="formItem" variant="outlined" label="password" type="password" value={this.state.password} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)} />
              </div>
              <div className="formButtonContainer">
                <div className="formButtonInner">
                  <CompleteButton text="Login" handleForm={this.formSubmit} size="medium" class="button" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;