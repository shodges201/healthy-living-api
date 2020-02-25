import { __extends } from "tslib";
import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js';
import './Cholesterol.css';
var Cholesterol = /** @class */ (function (_super) {
    __extends(Cholesterol, _super);
    function Cholesterol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.addNewData = function (date, level) {
            console.log(date, level);
        };
        return _this;
    }
    Cholesterol.prototype.componentDidMount = function () {
    };
    Cholesterol.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Graph, { graphType: "cholesterol", caption: "Cholesterol Level", yAxisLabel: "Total Cholesterol Level", suffix: "mg/dl", url: "/api/cholesterol", user: this.props.user })));
    };
    return Cholesterol;
}(Component));
export default Cholesterol;
//# sourceMappingURL=Cholesterol.js.map