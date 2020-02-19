import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';

interface RestingHeartRateProps{
    user: {
        username?: string;
        email?: string;
      }
}

interface RestingHeartRateState{
    
}

class RestingHeartRate extends Component<RestingHeartRateProps, RestingHeartRateState>{
    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Graph graphType="restingHeartRate" caption="BPM" yAxisLabel="Resting Heart Rate" suffix="BPM" url="api/heartrate" user={this.props.user}/>
            </>
        );
    }
}

export default RestingHeartRate;