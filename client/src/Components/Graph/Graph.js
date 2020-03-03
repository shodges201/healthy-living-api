import { __assign } from "tslib";
import React from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import "./Graph.css";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
function Graph(props) {
    console.log("Graph props data: " + props.data);
    var config = {
        type: 'line',
        width: '100%',
        height: '60%',
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
    };
    return (React.createElement("div", { className: "graphContainer" },
        React.createElement(ReactFC, __assign({}, config))));
}
export default Graph;
//# sourceMappingURL=Graph.js.map