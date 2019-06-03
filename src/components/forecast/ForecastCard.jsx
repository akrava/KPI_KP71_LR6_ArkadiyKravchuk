import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";


class ForecastCard extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.date}</Card.Title>
                    <Card.Text>
                        <img className="d-block mx-auto" src={`https://www.metaweather.com/static/img/weather/png/64/${this.props.abbr}.png`} />
                        Condition: {this.props.condition}
                    </Card.Text>
                    <Card.Text>
                        Temp: {this.props.temp.toFixed(2)}
                    </Card.Text>
                    <p className="muted">max temp: {this.props.max_temp.toFixed(2)}</p>
                    <p className="muted">min temp: {this.props.min_temp.toFixed(2)}</p>
                    <Card.Text>
                        Humidity: {this.props.humidity}
                    </Card.Text>
                    <Card.Text>
                        Air pressure: {this.props.air_pressure.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                        Wind: {this.props.wind_compass} {this.props.wind_speed.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                        Visibility: {this.props.visibility.toFixed(2)}
                    </Card.Text>
                </Card.Body>
          </Card>
        );
    }
}

ForecastCard.propTypes = {
    air_pressure: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    wind_compass: PropTypes.string.isRequired,
    wind_speed: PropTypes.number.isRequired,
    visibility: PropTypes.number.isRequired,
    max_temp: PropTypes.number.isRequired,
    min_temp: PropTypes.number.isRequired,
    abbr: PropTypes.string.isRequired
};


export default ForecastCard;