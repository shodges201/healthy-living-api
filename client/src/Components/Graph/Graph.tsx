import React from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import "./Graph.css";

interface GraphProps {
  caption?: string;
  graphType?: string;
  yAxisLabel: string;
  suffix: string;
  inputLabel: string;
  data: object[];
}

interface GraphConfig {
  type: string; // The chart type
  width: string; // Width of the chart
  height: string; // Height of the chart
  dataFormat: string;

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



ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function Graph(props: GraphProps) {

  console.log(`Graph props data: ${props.data}`);

  const config: GraphConfig = {
    type: 'line',// The chart type
    width: '100%', // Width of the chart
    height: '60%', // Height of the chart
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
      "data": props.data
    }
  }

  return (
     <div className="graphContainer">
      <ReactFC
        {...config}
      />
     </div>
    );
}

export default Graph;