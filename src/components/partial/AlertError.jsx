import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

class AlertError extends React.Component {
    render() {
        return (
            <Alert 
                className="mx-auto alert__error" 
                onClose={this.props.closedCb} 
                dismissible 
                variant="danger"
            >
                <Alert.Heading>{this.props.heading}</Alert.Heading>
                <p>
                    {this.props.text}
                </p>
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