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
                <Graph type="cholesterol" caption="Cholesterol Level" yAxisLabel="Total Cholesterol Level" suffix="mg/dl" url="api/cholesterol" user={this.props.user}/>
            </>
        );
    }
}

export default Cholesterol;