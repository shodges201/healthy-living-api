// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import history from '../../history';

export default class LogIn extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
          this.props.signIn(firebase.auth().currentUser);
          history.push('/Home');
      }
    },

  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}



/*import React, { Component } from 'react';
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

export default Login; */