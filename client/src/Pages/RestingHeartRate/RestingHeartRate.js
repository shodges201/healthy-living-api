import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';

class RestingHeartRate extends Component {
    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Graph caption="Heart Rate Tracking" yAxisLabel="Resting Heart Rate" suffix="BPM" url="api/heartrate" user={this.props.user}/>
            </>
        );
    }
}

export default RestingHeartRate;