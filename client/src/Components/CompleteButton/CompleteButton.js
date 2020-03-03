import * as React from 'react';
import Button from '@material-ui/core/Button';
function CompleteButton(props) {
    return (React.createElement(Button, { onClick: function (event) { return props.handleForm(event); }, variant: "contained", size: props.size, color: "primary", className: props.class, type: "submit" }, props.text));
}
CompleteButton.defaultProps = {
    text: "Create New Entry",
    class: "button",
    size: "small"
};
export default CompleteButton;
//# sourceMappingURL=CompleteButton.js.map