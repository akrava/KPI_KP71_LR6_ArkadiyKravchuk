import React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "@configs/UserProvider";
import PropTypes from "prop-types";
import CardDeck from "react-bootstrap/CardDeck";
import ForecastCard from "@components/forecast/ForecastCard";
import Spinner from "react-bootstrap/Spinner";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.cors = "https://cors-anywhere.herokuapp.com/";
        this.state = {
            city: "Kyiv",
            cityId: 924938,
            isLoading: true,
            forecastArray: [],
            lat: null,
            long: null,
            foundByLocation: false,
            redirectTo: null
        };
        this.renderForecastCards = this.renderForecastCards.bind(this);
        this.selectForecast = this.selectForecast.bind(this);
        this.cityForecast = this.cityForecast.bind(this);
        this.locationForecast = this.locationForecast.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    renderForecastCards() {
        const { forecastArray } = this.state;
        const count = forecastArray.length;
        const arr = forecastArray.map((x, id) => (
            <ForecastCard 
                key={id}
                air_pressure={x.air_pressure}
                date={x.applicable_date}
                humidity={x.humidity}
                temp={x.the_temp}
                condition={x.weather_state_name}
                wind_compass={x.wind_direction_compass}
                wind_speed={x.wind_speed}
                visibility={x.visibility}
                max_temp={x.max_temp}
                min_temp={x.min_temp}
                abbr={x.weather_state_abbr}
            />
        ));
        if (count > 5) {
            return arr.slice(1, 6);
        }
        return arr;
    }

    selectForecast() {
        const { cors } = this;
        const { lat, long, cityId } = this.state;
        if (lat && long) {
            this.locationForecast(lat, long, cors);
        } else {
            this.cityForecast(cityId, cors);
        }
    }

    cityForecast(id, cors) {
        this.fetchForecast(id, cors)
        .then(data => {
            if (data && data.consolidated_weather) {
                this.setState({
                    forecastArray: data.consolidated_weather,
                    isLoading: false
                });
            }
        }).catch(e => console.error(e));
    }

    locationForecast(lat, long, cors) {
        this.fetchNearestCity(lat, long, cors)
        .then(data => {
            this.setState({
                foundByLocation: true,
                city: data.title
            });
            if (data && data.woeid) {
                return data.woeid;
            }
        }).then(id => this.cityForecast(id, cors))
        .catch(e => console.error(e));
    }

    async fetchForecast(id, cors) {
        let respBody;
        try {
            const response = await fetch(`${cors}www.metaweather.com/api/location/${id}/`);
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            console.log(e);
        }
        return respBody;
    }

    async fetchNearestCity(lat, long, cors) {
        let respBody;
        try {
            const response = await fetch(
                `${cors}www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
            );
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            console.log(e);
        }
        if (respBody && Array.isArray(respBody) && respBody[0]) {
            return respBody[0];
        } else {
            return null;
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                this.setState({ 
                    lat: location.coords.latitude,  
                    long:location.coords.longitude
                });
            });
        }
    }

    checkLogin() {
        const { context } = this.props;
        if (!context.user.logined) {
            this.setState({
                redirectTo: "/"
            });
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.checkLogin();
    }

    componentDidMount() {
        if (this.checkLogin()) {
            this.getLocation();
            setTimeout(() => this.selectForecast(), 2000);
        }
    }

    render() {
        const { city, foundByLocation, lat, long, redirectTo } = this.state;
        return (
            <>
            {redirectTo && <Redirect to={redirectTo} />} 
            <h1>
                Weather forecast for {city} 
                {foundByLocation && <span className="text-muted"> {`${lat}, ${long}`}</span>}
            </h1>
            {this.state.isLoading 
                ? 
                <Spinner animation="border" className="mx-auto mt-4" size="lg" /> 
                :
                <CardDeck> 
                    {this.renderForecastCards()}
                </CardDeck>
            }
            </>
        );
    }
}

Weather.propTypes = {
    context: PropTypes.object.isRequired
};

const WeatherWithContext = props => (
    <UserContext.Consumer>
        {context => <Weather {...props} context={context} />}
    </UserContext.Consumer>
);

export default WeatherWithContext;