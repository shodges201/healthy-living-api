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
                    <h1>
                        Welcome to Healthy Living
                    </h1>
                    <h5>
                        An Application to track health markers like cholesterol 
                        and resting heart rate over time for a healthier lifestyle.
                    </h5>
                </div>
                <div className="explanation">
                    <div>
                        Sign in
                    </div>
                    <div>
                        View existing data
                    </div>
                    <div>
                        Or add new data
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;