import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";


class ForecastCard extends React.Component {
    getReadableDate(date) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("en", options);
    }

    getImgCondition(abbr) {
        return `https://www.metaweather.com/static/img/weather/png/64/${abbr}.png`;
    }

    getTempFormat(temp, precision) {
        return `${temp.toFixed(typeof precision === 'number' ? precision : 2)} °C`;
    }

    renderWindDirection(dir) {
        return (<i className={`wind-direction wind-direction__${dir.toLowerCase()}`} />);
    }

    render() {
        const { 
            getReadableDate, getImgCondition, getTempFormat, renderWindDirection
        } = this;
        const { 
            date, abbr, condition, temp, max_temp, min_temp, humidity, air_pressure,
            wind_compass, wind_speed, visibility
        } = this.props;
        return (
            <Card>
                <Card.Body>
                    <Card.Title className="text-center">
                        {getReadableDate(date)}
                    </Card.Title>
                    <Card.Text className="text-center">
                        <img 
                            className="d-block mx-auto" 
                            src={getImgCondition(abbr)} 
                        />
                        {condition}
                    </Card.Text>
                    <Card.Text>
                        <b>Temp:</b> {getTempFormat(temp)}
                    </Card.Text>
                    <p className="text-muted">
                        Max: {getTempFormat(max_temp, 0)}<br />
                        Min: {getTempFormat(min_temp, 0)}
                    </p>
                    <Card.Text>
                        <b>Humidity:</b> {humidity} %
                    </Card.Text>
                    <Card.Text>
                        <b>Pressure:</b> {air_pressure.toFixed()} mb
                    </Card.Text>
                    <Card.Text>
                        <b>Wind: </b> 
                        {renderWindDirection(wind_compass)} 
                        {wind_speed.toFixed(2)} mph 
                    </Card.Text>
                    <Card.Text>
                        <b>Visibility:</b> {visibility.toFixed(2)} miles
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