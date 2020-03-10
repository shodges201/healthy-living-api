import React from 'react';
var styles = {
    container: {
        display: "table",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
    },
    middle: {
        display: "table-cell",
        verticalAlign: "middle"
    },
    inner: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "400px"
    },
    text: {
        color: "white"
    }
};
export default function NoMatch() {
    return (React.createElement("div", { style: styles.container },
        React.createElement("div", { style: styles.middle },
            React.createElement("div", { style: styles.inner },
                React.createElement("h1", { style: styles.text }, "This Page Cannot Be Found")))));
}
//# sourceMappingURL=NoMatch.js.map