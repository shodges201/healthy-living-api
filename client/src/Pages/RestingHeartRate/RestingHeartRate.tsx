import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';

interface RestingHeartRateProps{
    user: {
        username?: string;
        email?: string;
        id?: string;
      };
}

interface RestingHeartRateState{
    
}

class RestingHeartRate extends Component<RestingHeartRateProps, RestingHeartRateState>{
    state = {};

    componentDidMount() {
    }

    addNewData = (date: Date, level: Number) => {
        console.log(date, level);
    }

    render() {
        return (
            <>
                <Graph 
                graphType="restingHeartRate" 
                caption="BPM" 
                yAxisLabel="Resting Heart Rate" 
                suffix="BPM" 
                url="/api/heartrate" 
                user={this.props.user}
                inputLabel="BPM"
                />
            </>
        );
    }
}

export default RestingHeartRate;