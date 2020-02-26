import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './Cholesterol.css';

interface CholesterolProps {
    user: {
        username?: string;
        email?: string;
        id?: string;
    };
}

interface CholesterolState {

}

class Cholesterol extends Component<CholesterolProps, CholesterolState> {
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
                    graphType="cholesterol"
                    caption="Cholesterol Level"
                    yAxisLabel="Total Cholesterol Level"
                    suffix="mg/dl"
                    url="/api/cholesterol"
                    user={this.props.user}
                />
            </>
        );
    }
}

export default Cholesterol;