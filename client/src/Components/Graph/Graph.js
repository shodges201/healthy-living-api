import { __assign, __extends } from "tslib";
import React, { Component } from 'react';
import FusionCharts from "fusioncharts";
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import NewItemForm from '../../Components/NewItemForm/NewItemForm';
import { Container } from '@material-ui/core';
import "./Graph.css";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dataSource: {},
            chartConfigs: {}
        };
        _this.getAllData = function (cb) {
            fetch(_this.props.url + "/getAll", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: _this.props.user.username })
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
            fetch(_this.props.url + "/new", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: date, amount: amount, userID: _this.props.user.username })
            }).then(function (data) { return data.json(); }).then(function (data) {
                cb();
                _this.getAllData(function (entries) {
                    console.log(entries);
                    console.log(__assign(__assign(__assign({}, _this.state.chartConfigs), _this.state.dataSource), { data: entries }));
                    _this.setState({
                        chartConfigs: {
                            type: 'line',
                            width: '100%',
                            height: '600',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": _this.props.caption,
                                    "xAxisName": "Date",
                                    "yAxisName": _this.props.yAxisLabel,
                                    "numberSuffix": _this.props.suffix,
                                    setadaptiveymin: "1",
                                    "theme": "fusion"
                                },
                                "data": entries
                            }
                        }
                    });
                });
            });
        };
        return _this;
    }
    Graph.prototype.componentDidMount = function () {
        var _this = this;
        this.getAllData(function (data) {
            console.log('constructor data: ');
            console.log(data);
            _this.setState({
                chartConfigs: {
                    type: 'line',
                    width: '100%',
                    height: '60%',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": _this.props.caption,
                            "xAxisName": "Date",
                            "yAxisName": _this.props.yAxisLabel,
                            "numberSuffix": _this.props.suffix,
                            setadaptiveymin: "1",
                            "theme": "fusion"
                        },
                        "data": data
                    }
                }
            });
        });
    };
    Graph.prototype.render = function () {
        return (React.createElement(Container, { className: "wrapper", maxWidth: "xl" },
            React.createElement(ReactFC, __assign({}, this.state.chartConfigs)),
            React.createElement(NewItemForm, { graphType: "line", label: this.props.graphType, caption: this.props.caption, addNewData: this.addNewData })));
    };
    return Graph;
}(Component));
export default Graph;
//# sourceMappingURL=Graph.js.map