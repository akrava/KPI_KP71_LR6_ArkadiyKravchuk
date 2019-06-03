import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "@routes/Login";
import Weather from "@routes/Weather";
import NotFound from "@routes/NotFound";

export default class Main extends React.Component {
    render() {
        return (
            <main className="container my-3">
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/dashboard' component={Weather}/>
                    <Route component={NotFound}/>
                </Switch>
            </main>
        );
    }
}