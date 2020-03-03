import { __extends } from "tslib";
import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './RestingHeartRate.css';
var RestingHeartRate = /** @class */ (function (_super) {
    __extends(RestingHeartRate, _super);
    function RestingHeartRate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.addNewData = function (date, level) {
            console.log(date, level);
        };
        return _this;
    }
    RestingHeartRate.prototype.componentDidMount = function () {
    };
    RestingHeartRate.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Graph, { graphType: "restingHeartRate", caption: "BPM", yAxisLabel: "Resting Heart Rate", suffix: "BPM", url: "/api/heartrate", user: this.props.user, inputLabel: "BPM" })));
    };
    return RestingHeartRate;
}(Component));
export default RestingHeartRate;
//# sourceMappingURL=RestingHeartRate.js.map