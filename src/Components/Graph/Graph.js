import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartConfigs: {
        type: 'column2d',
        width: 600,
        height: 400,
        dataFormat: 'json',
        dataSource: {
          "chart": {
            "caption": props.caption,
            "xAxisName": "Date",
            "yAxisName": props.yAxisLabel,
            "numberSuffix": props.suffix,
            "theme": "fusion"
          },
          "data": [{
            "label": "Venezuela",
            "value": "290"
          },
          {
            "label": "Saudi",
            "value": "260"
          },]
        }
      }
    }
  }

  componentDidMount() {
    return;
  }
  render() {
    return <ReactFC {...this.state.chartConfigs} />;
  }
}

export default Graph;