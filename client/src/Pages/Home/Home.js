import React, { Component } from 'react';

class Home extends Component {
    state = { loggedIn: false }

    componentDidMount = () => {
        
    }

    render() { 
        return ( this.state.loggedIn );
    }
}
 
export default Home;