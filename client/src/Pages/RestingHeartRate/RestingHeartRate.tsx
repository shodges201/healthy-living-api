import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';
import DialogOpener from "../../Components/DialogOpener/DialogOpener"
import NoData from 'src/Components/NoData/NoData.js';

interface RestingHeartRateProps{
    user: {
        username?: string;
        email?: string;
        id?: string;
      };
}

interface RestingHeartRateState{
    dataAvailable: boolean;
    data: object[];
}

interface dataFormat {
    label: string;
    value: Number;
}

interface dbResult {
    userID: any;
    level: Number;
    date: Date;
}

class RestingHeartRate extends Component<RestingHeartRateProps, RestingHeartRateState>{
    state = {
        dataAvailable: false,
        data: []
    };

    url = "/api/heartrate";

    componentDidMount() {
        this.getAllData((data: object[]) => {
            if (data.length > 0) {
                console.log("there is existing data")
                return this.setState({ data: data, dataAvailable: true });
            }
            return this.setState({data: data});
        })
    }

    getAllData = (cb: Function) => {
        fetch(`${this.url}/getAllUser`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then((data: dbResult[]) => {
            const formattedData: dataFormat[] = data.map(item => {
                return { label: new Date(item.date).toLocaleDateString(), value: item.level }
            })
            console.log(formattedData);
            cb(formattedData);
        })
    }

    addNewData = (date: Date, amount: Number, cb: Function) => {
        fetch(`${this.url}/new`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: date, amount: amount })
        }).then(data => data.json()).then((data) => {
            this.getAllData((entries: any) => {
                console.log(entries);
                if(!this.state.dataAvailable){
                    this.setState({ data: entries, dataAvailable: true });
                }
                else{
                    this.setState({ data: entries });
                }
                cb();
            })
        })
    }

    render() {
        return (
            this.state.dataAvailable ?
                (<>
                    <Graph
                        graphType="heart rate"
                        caption="Heart Rate"
                        yAxisLabel="BPM"
                        suffix="BPM"
                        inputLabel="Heart Rate"
                        data={this.state.data}
                    />
                    <DialogOpener
                        graphType={"line"}
                        label={"BPM"}
                        caption={"Resting Heart Rate"}
                        submitNewEntry={this.addNewData} />
                    )
                </>)
                :
                (
                    <>
                        <NoData/>
                        <DialogOpener
                            graphType={"line"}
                            label={"BPM"}
                            caption={"Resting Heart Rate"}
                            submitNewEntry={this.addNewData} />
                    </>
                )
        )
    }
}

export default RestingHeartRate;