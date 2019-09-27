import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './Cholesterol.css';

class Cholesterol extends Component {
    state = {};
    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Graph caption="Cholesterol Tracking" yAxisLabel="Total Cholesterol Level" suffix="mg/dl" url="api/cholesterol"/>
            </>
        );
    }
}

export default Cholesterol;