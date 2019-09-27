import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import HeartRateForm from '../../Components/HeartRateForm/HeartRateForm.js';
import CholesterolForm from '../../Components/CholesterolForm/CholesterolForm';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null
    }
  }


  getAllData = (cb) => {
    fetch(`${this.props.url}/getAll`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: 'scott' })
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
    fetch(`${this.props.url}/new`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: date, amount: amount })
    }).then(data => data.json()).then((data) => {
      cb();
      this.getAllData(entries => {
        console.log(entries);
        console.log({ ...this.state.chartConfigs, ...this.state.dataSource, data: entries });
        this.setState({
          chartConfigs: {
            type: 'line',// The chart type
            width: '100%', // Width of the chart
            height: '400', // Height of the chart
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
          height: '400', // Height of the chart
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

  conditionalForm = () => {
    if(window.location.pathname === '/Cholesterol'){
      return <CholesterolForm addNewData={this.addNewData} />;
    }
    // else if(window.location.pathname === '/Cholesterol'){

    // }
    else{
     return <HeartRateForm addNewData={this.addNewData} /> ;
    }
  }

  render() {
    return (
      <>
        <ReactFC
          {...this.state.chartConfigs}
        />
        {this.conditionalForm()}
      </>);
  }
}

export default Graph;