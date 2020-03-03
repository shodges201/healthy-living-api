import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './Cholesterol.css';
import DialogOpener from "../../Components/DialogOpener/DialogOpener";
import NoData from "../../Components/NoData/NoData";

interface CholesterolProps {
    user: {
        username?: string;
        email?: string;
        id?: string;
    };
}

interface CholesterolState {
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

class Cholesterol extends Component<CholesterolProps, CholesterolState> {
    state = {
        dataAvailable: false,
        data: []
    };

    url = "/api/Cholesterol";

    componentDidMount() {
        this.getAllData((data: object[]) => {
            console.log('constructor data: ');
            console.log(data);
            if (data.length > 0) {
                console.log("there is existing data")
                return this.setState({ data: data, dataAvailable: true });
            }
            return this.setState({data: data});
        })

    }

    getAllData = (cb: Function) => {
        console.log(`${this.url}/getAllUser`);
        fetch(`/api/cholesterol/getAllUser`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then((data: dbResult[]) => {
            console.log('fetch resp');
            console.log(data);
            const formattedData: dataFormat[] = data.map(item => {
                return { label: new Date(item.date).toLocaleDateString(), value: item.level }
            })
            console.log(formattedData);
            cb(formattedData);
        })
    }

    addNewData = (date: Date, amount: Number, cb: Function) => {
        console.log(date);
        console.log(amount);
        console.log(`${this.url}/new`);
        fetch(`${this.url}/new`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: date, amount: amount })
        }).then(data => data.json()).then((data) => {
            console.log(`new entry: ${data}`);
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
                        graphType="cholesterol"
                        caption="Cholesterol Level"
                        yAxisLabel="Total Cholesterol Level"
                        suffix="mg/dl"
                        inputLabel="Cholesterol"
                        data={this.state.data}
                    />
                    <DialogOpener
                        graphType={"line"}
                        label={"Cholesterol"}
                        caption={"Cholesterol"}
                        submitNewEntry={this.addNewData} />
                    )
                </>)
                :
                (
                    <>
                        <NoData/>
                        <DialogOpener
                            graphType={"line"}
                            label={"Cholesterol"}
                            caption={"Cholesterol"}
                            submitNewEntry={this.addNewData} />
                    </>
                )
        )
    }
}

export default Cholesterol;