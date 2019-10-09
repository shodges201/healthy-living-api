import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import NewItemForm from '../../Components/NewItemForm/NewItemForm'
import { Container } from '@material-ui/core';
import "./Graph.css";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }
  }


  getAllData = (cb) => {
    fetch(`/api/${this.props.url}/getAll`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID: this.props.user.uid })
    }).then(data => data.json()).then((data) => {
      console.log('fetch resp');
      console.log(data);
      const formattedData = data.map(item => {
        return { label: new Date(item.date).toLocaleDateString(), value: item.amount }
      })
      console.log(formattedData);
      cb(formattedData);
    })
  }

  addNewData = (date, amount, cb) => {
    fetch(`/api/${this.props.url}/new`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date, amount: amount, userID: this.props.user.uid})
    }).then(data => data.json()).then((data) => {
      cb();
      this.getAllData(entries => {
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
    this.getAllData(data => {
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
        <NewItemForm label={this.props.type} caption={this.props.caption}/>
      </Container>);
  }
}

export default Graph;