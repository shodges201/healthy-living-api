import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js'
import CholesterolForm from '../../Components/CholesterolForm/CholesterolForm.js'
import { format } from 'path';

class Cholesterol extends Component {
    state = ({data: []})
    constructor(props){
        super(props);
        fetch('api/cholesterol', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: 'scott' })
        }).then(data => data.json()).then((data) => {
            console.log('fetch resp');
            console.log(data);
            const formattedData = [{ label: data[0].user, value: data[0].amount }];
            console.log(formattedData);
            this.state = { data: formattedData };
            return formattedData;
        })
    }
    

    getAllData = () => {
        fetch('api/cholesterol', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: 'scott' })
        }).then(data => data.json()).then((data) => {
            console.log('fetch resp');
            console.log(data);
            const formattedData = [{ label: data[0].user, value: data[0].amount }];
            console.log(formattedData);
            this.setState({ data: formattedData })
            return formattedData;
        })
    }

    componentDidMount() {
        let data = this.getAllData();
        console.log(data);
    }

    render() {
        return (
            <>
                <Graph data={this.state.data} caption="Cholesterol Tracking" yAxisLabel="Total Cholesterol Level" suffix="mg/dl" />
                <CholesterolForm />
            </>
        );
    }
}

export default Cholesterol;