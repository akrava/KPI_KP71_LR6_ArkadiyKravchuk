import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

class AlertError extends React.Component {
    render() {
        const { closedCb, heading, text } = this.props;
        return (
            <Alert 
                className="mx-auto alert__error" 
                onClose={closedCb} 
                dismissible 
                variant="danger"
            >
                <Alert.Heading>{heading}</Alert.Heading>
                <p>{text}</p>
            </Alert>
        );
    }
}

AlertError.propTypes = {
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    closedCb: PropTypes.func.isRequired
};

export default AlertError;