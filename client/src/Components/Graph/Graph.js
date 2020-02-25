import { __assign, __extends } from "tslib";
import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
//import NewItemForm from '../../Components/NewItemForm/NewItemForm'
import { Container } from '@material-ui/core';
import "./Graph.css";
import DialogOpener from "../DialogOpener/DialogOpener";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph(props) {
        var _this = _super.call(this, props) || this;
        _this.getAllData = function (cb) {
            console.log(_this.props.url + "/getAllUser");
            fetch(_this.props.url + "/getAllUser", {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) { return data.json(); }).then(function (data) {
                console.log('fetch resp');
                console.log(data);
                var formattedData = data.map(function (item) {
                    return { label: new Date(item.date).toLocaleDateString(), value: item.level };
                });
                console.log(formattedData);
                cb(formattedData);
            });
        };
        _this.addNewData = function (date, amount, cb) {
            console.log(date);
            console.log(amount);
            console.log(_this.props.url + "/new");
            fetch(_this.props.url + "/new", {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: date, amount: amount })
            }).then(function (data) { return data.json(); }).then(function (data) {
                _this.getAllData(function (entries) {
                    console.log(entries);
                    var prevData = Object.assign({}, _this.state.dataSource);
                    console.log("prevData before: " + JSON.stringify(prevData));
                    prevData.data = entries;
                    console.log("prevData after: " + JSON.stringify(prevData));
                    _this.setState({ dataSource: prevData });
                });
            });
        };
        _this.state = {
            type: 'line',
            width: '100%',
            height: '600',
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
        };
        ;
        return _this;
    }
    Graph.prototype.componentDidMount = function () {
        var _this = this;
        this.getAllData(function (data) {
            console.log('constructor data: ');
            console.log(data);
            var prevData = Object.assign({}, _this.state.dataSource);
            prevData.data = data;
            _this.setState({ dataSource: prevData });
        });
    };
    Graph.prototype.render = function () {
        return (React.createElement(Container, { className: "wrapper", maxWidth: "xl" },
            React.createElement(ReactFC, __assign({}, this.state)),
            React.createElement(DialogOpener, { graphType: "line", label: "label", caption: this.props.caption, addNewData: this.addNewData })));
    };
    return Graph;
}(Component));
export default Graph;
//# sourceMappingURL=Graph.js.map