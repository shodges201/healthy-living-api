import React, { Component } from 'react';
import "./Home.css";

class Home extends Component {
    state = {  }

    componentDidMount = () => {

    }

    render() { 
        return (
            <div className="container">
                <div className="welcome">
                    <h1 className="welcomeHeader">
                        Healthy Living
                    </h1>
                    <h5 className="welcomeDescription">
                        An Application to track health markers like cholesterol 
                        and resting heart rate over time for a healthier lifestyle.
                    </h5>
                </div>
                <div className="explanation">
                    <div className="explanationInner">
                        Sign in
                    </div>
                    <div className="explanationInner">
                        View existing data
                    </div>
                    <div className="explanationInner">
                        Or add new data
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;