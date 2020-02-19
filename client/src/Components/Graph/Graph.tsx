import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import NewItemForm from '../../Components/NewItemForm/NewItemForm'
import { Container } from '@material-ui/core';
import "./Graph.css";

interface GraphProps{
  url?: string;
  caption?: string;
  graphType?: string;
  yAxisLabel?: string;
  suffix?: string;
  user: {
    username?: string;
    email?: string;
  }
}

interface GraphState{
  dataSource: object;
  chartConfigs: object;
}

interface dataFormat{
  label: string; 
  value: Number;
}

interface dbResult{
  userID: any; 
  level: Number; 
  date: Date;
}

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component <GraphProps, GraphState>{
    state = {
      dataSource: {},
      chartConfigs: {}
    }


  getAllData = (cb: Function) => {
    fetch(`${this.props.url}/getAll`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID: this.props.user.username })
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
    fetch(`${this.props.url}/new`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date, amount: amount, userID: this.props.user.username})
    }).then(data => data.json()).then((data) => {
      cb();
      this.getAllData((entries: any) => {
        console.log(entries);
        console.log({ ...this.state.chartConfigs, ...this.state.dataSource, data: entries });
        this.setState({
          chartConfigs: {
            type: 'line',// The chart type
            width: '100%', // Width of the chart
            height: '600', // Height of the chart
            dataFormat: 'json',
            dataSource: {
              "chart": {
                "caption": this.props.caption,
                "xAxisName": "Date",
                "yAxisName": this.props.yAxisLabel,
                "numberSuffix": this.props.suffix,
                setadaptiveymin: "1",
                "theme": "fusion"
              },
              "data": entries
            }
          }
        })
      })
    })
  }

  componentDidMount() {
    this.getAllData((data: any) => {
      console.log('constructor data: ');
      console.log(data);
      this.setState({
        chartConfigs: {
          type: 'line',// The chart type
          width: '100%', // Width of the chart
          height: '60%', // Height of the chart
          dataFormat: 'json',
          dataSource: {
            "chart": {
              "caption": this.props.caption,
              "xAxisName": "Date",
              "yAxisName": this.props.yAxisLabel,
              "numberSuffix": this.props.suffix,
              setadaptiveymin: "1",
              "theme": "fusion"
            },
            "data": data
          }
        }
      })
    })
  }

  render() {
    return (
      <Container className="wrapper" maxWidth="xl">
        <ReactFC
          {...this.state.chartConfigs}
        />
        <NewItemForm graphType={"line"} label={this.props.graphType} caption={this.props.caption} addNewData={this.addNewData}/>
      </Container>);
  }
}

export default Graph;