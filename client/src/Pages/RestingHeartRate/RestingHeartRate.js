import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import HeartRateForm from '../../Components/HeartRateForm/HeartRateForm.js';
import './RestingHeartRate.css';

class RestingHeartRate extends Component {
    state = {};

    componentDidMount() {
    }

    addNewData = (date, amount, cb) => {
        fetch('api/heartrate/new', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: date, amount: amount })
          }).then(data => data.json()).then((data) => {
            cb();
          })
    }

    render() {
        return (
            <>
                <Graph data={this.state.data} caption="Heart Rate Tracking" yAxisLabel="Resting Heart Rate" suffix="BPM" url="api/heartrate" />
                <HeartRateForm addNewData={this.addNewData} />
            </>
        );
    }
}

export default RestingHeartRate;