import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import "./Graph.css";
import DialogOpener from "../DialogOpener/DialogOpener"

interface GraphProps {
  url?: string;
  caption?: string;
  graphType?: string;
  yAxisLabel: string;
  suffix: string;
  user: {
    username?: string;
    email?: string;
    id?: string;
  }
  inputLabel: string;
}

interface GraphState {
  type: string; // The chart type
  width: string; // Width of the chart
  height: string; // Height of the chart
  dataFormat: 'json';
  dataSource: {
    "chart": {
      "caption"?: string;
      "xAxisName": "Date";
      "yAxisName": string;
      "numberSuffix": string;
      setadaptiveymin: "1";
      "theme": "fusion";
    },
    "data": object[];
  };
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

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component<GraphProps, GraphState>{
  constructor(props: GraphProps) {
    super(props);
    this.state = {
      type: 'line',// The chart type
      width: '100%', // Width of the chart
      height: '600', // Height of the chart
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": props.caption,
          "xAxisName": "Date",
          "yAxisName": props.yAxisLabel,
          "numberSuffix": props.suffix,
          setadaptiveymin: "1",
          "theme": "fusion"
        },
        "data": []
      }
    };;
  }


  getAllData = (cb: Function) => {
    console.log(`${this.props.url}/getAllUser`);
    fetch(`${this.props.url}/getAllUser`, {
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
    console.log(`${this.props.url}/new`);
    fetch(`${this.props.url}/new`, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date, amount: amount })
    }).then(data => data.json()).then((data) => {
      this.getAllData((entries: any) => {
        console.log(entries);
        let prevData = Object.assign({}, this.state.dataSource);
        console.log(`prevData before: ${JSON.stringify(prevData)}`);
        prevData.data = entries;
        console.log(`prevData after: ${JSON.stringify(prevData)}`);
        this.setState({dataSource: prevData});
        cb();
      })
    })
  }

  componentDidMount() {
    this.getAllData((data: any) => {
      console.log('constructor data: ');
      console.log(data);
      let prevData = Object.assign({}, this.state.dataSource);
      prevData.data = data;
      this.setState({ dataSource: prevData });
    })
  }

  render() {
    return (
      <div className="graphContainer">
        <ReactFC
          {...this.state}
        />
        <DialogOpener 
        graphType={"line"} 
        label={this.props.inputLabel} 
        caption={this.props.caption} 
        submitNewEntry={this.addNewData}/>
        {//<NewItemForm graphType={"line"} label={this.props.graphType} caption={this.props.caption} addNewData={this.addNewData} />
        }
      </div>);
  }
}

export default Graph;