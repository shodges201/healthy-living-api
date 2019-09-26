import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import CholesterolForm from '../../Components/CholesterolForm/CholesterolForm.js';
import './Cholesterol.css';

class Cholesterol extends Component {
    state = {};
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    addNewData = (date, amount, cb) => {
        fetch('api/cholesterol/new', {
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
                <Graph data={this.state.data} caption="Cholesterol Tracking" yAxisLabel="Total Cholesterol Level" suffix="mg/dl" url="api/cholesterol"/>
                <CholesterolForm addNewData={this.addNewData} />
            </>
        );
    }
}

export default Cholesterol;