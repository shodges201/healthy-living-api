import React, { Component } from 'react';
const styles = {
    container: {
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: "3fr 2fr"
      },
      welcome: {
        color: "white",
        textAlign: "center" as 'center',
        fontSize: "30px",
        alignSelf: "center"
      },
      welcomeHeader: {
        marginTop: "0px",
        marginBottom: "10px"
      },
      welcomeDescription: {
        marginTop: "10px",
        marginBottom: "0px"
      },
      explanation: {
        background: "white",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridColumnGap: "auto"
      },
      explanationInner: {
        textAlign: "center" as 'center',
        alignSelf: "center",
        fontSize: "25px"
      }
}

class Home extends Component {
    state = {  }

    componentDidMount = () => {

    }

    render() { 
        return (
            <div style={styles.container}>
                <div style={styles.welcome}>
                    <h1 style={styles.welcomeHeader}>
                        Welcome to Healthy Living
                    </h1>
                    <h5 style={styles.welcomeDescription}>
                        An Application to track health markers like cholesterol 
                        and resting heart rate over time for a healthier lifestyle.
                    </h5>
                </div>
                <div style={styles.explanation}>
                    <div style={styles.explanationInner}>
                        Sign in
                    </div>
                    <div style={styles.explanationInner}>
                        View existing data
                    </div>
                    <div style={styles.explanationInner}>
                        Or add new data
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Home;