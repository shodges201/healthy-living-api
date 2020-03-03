import { __extends } from "tslib";
import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './Cholesterol.css';
import DialogOpener from "../../Components/DialogOpener/DialogOpener";
import NoData from "../../Components/NoData/NoData";
var Cholesterol = /** @class */ (function (_super) {
    __extends(Cholesterol, _super);
    function Cholesterol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dataAvailable: false,
            data: []
        };
        _this.url = "/api/Cholesterol";
        _this.getAllData = function (cb) {
            console.log(_this.url + "/getAllUser");
            fetch("/api/cholesterol/getAllUser", {
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
            console.log(_this.url + "/new");
            fetch(_this.url + "/new", {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: date, amount: amount })
            }).then(function (data) { return data.json(); }).then(function (data) {
                console.log("new entry: " + data);
                _this.getAllData(function (entries) {
                    console.log(entries);
                    if (!_this.state.dataAvailable) {
                        _this.setState({ data: entries, dataAvailable: true });
                    }
                    else {
                        _this.setState({ data: entries });
                    }
                    cb();
                });
            });
        };
        return _this;
    }
    Cholesterol.prototype.componentDidMount = function () {
        var _this = this;
        this.getAllData(function (data) {
            console.log('constructor data: ');
            console.log(data);
            if (data.length > 0) {
                console.log("there is existing data");
                return _this.setState({ data: data, dataAvailable: true });
            }
            return _this.setState({ data: data });
        });
    };
    Cholesterol.prototype.render = function () {
        return (this.state.dataAvailable ?
            (React.createElement(React.Fragment, null,
                React.createElement(Graph, { graphType: "cholesterol", caption: "Cholesterol Level", yAxisLabel: "Total Cholesterol Level", suffix: "mg/dl", inputLabel: "Cholesterol", data: this.state.data }),
                React.createElement(DialogOpener, { graphType: "line", label: "Cholesterol", caption: "Cholesterol", submitNewEntry: this.addNewData }),
                ")"))
            :
                (React.createElement(React.Fragment, null,
                    React.createElement(NoData, null),
                    React.createElement(DialogOpener, { graphType: "line", label: "Cholesterol", caption: "Cholesterol", submitNewEntry: this.addNewData }))));
    };
    return Cholesterol;
}(Component));
export default Cholesterol;
//# sourceMappingURL=Cholesterol.js.map