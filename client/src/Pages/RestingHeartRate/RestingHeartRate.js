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
                <Graph type="cholesterol" caption="BPM" yAxisLabel="Resting Heart Rate" suffix="BPM" url="api/heartrate" user={this.props.user}/>
            </>
        );
    }
}

export default RestingHeartRate;