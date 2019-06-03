import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertError from "@components/partial/AlertError";
import UserContext from "@configs/UserContext";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.checkCookies = this.checkCookies.bind(this);
        this.state = {
            login: '',
            password: '',
            remember: false,
            errorLogin: false
        };
    }

    handleCloseError() {
        this.setState({ errorLogin: false });
    }

    handleSubmit(context) {
        const component = this;
        return function(event) {
            event.preventDefault();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
                component.setButtonStatus();
                const inputs = component.getAllFormInputs(form);
                inputs.forEach(x => component.checkValidityInput(x));
                return;
            }
            const { login, password, remember } = component.state;
            const isLogined = context.login(login, password, remember);
            if (isLogined) {
                component.setState({ errorLogin: false });
                component.props.history.push("/dashboard");
            } else {
                component.setState({ errorLogin: true });
            }
        };
    }

    getAllFormInputs(form) {;
        return [...form.elements].filter(x => x.getAttribute("type") !== "submit");
    }

    handleFieldChange(field, component) {
        return function(event) {
            const input = event.target;
            if (typeof input.value === "undefined") {
                return;
            }
            component.setState({ [field]: input.value });
            component.checkValidityInput(input);
            component.setButtonStatus();
        };
    }

    checkValidityInput(input) {
        if (!input.validity.valid) {
            input.classList.toggle("is-invalid", true);
            input.classList.toggle("is-valid", false);
        } else {
            input.classList.toggle("is-invalid", false);
            input.classList.toggle("is-valid", true);
        }
    }

    setButtonStatus() {
        const form = document.forms[0];
        const buttonSubmit = form.querySelector('[type="submit"]');
        buttonSubmit.toggleAttribute("disabled", !form.checkValidity());
    }

    handleCheckBoxChange(e) {
        this.setState({ "remember": e.currentTarget.checked });
    }

    checkCookies(context) {
        const username = Cookies.get('username');
        const password = Cookies.get('password');
        const isLogined = context.login(username, password, true);
        if (isLogined) {
            this.setState({ errorLogin: false });
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <UserContext.Consumer>
            {context => (
                <div>
                {this.checkCookies(context)}
                <h1 className="text-center mb-2">Login to the web app</h1>
                    <div>
                        {this.state.errorLogin && 
                            <AlertError 
                                closedCb={this.handleCloseError} 
                                heading="Error login" 
                                text="No such user found" 
                            />
                        }
                    </div>
                    <Form 
                        className="form-default p-4 mx-auto" 
                        onSubmit={this.handleSubmit(context)} 
                        noValidate
                    >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control 
                                type="text"
                                minLength="5" 
                                maxLength="25"
                                placeholder="Enter login"
                                pattern="[A-Za-z_0-9]{5,25}"
                                value={this.state.login}
                                onChange={this.handleFieldChange("login", this)}
                                name="login"
                                required
                            />
                            <Form.Text className="text-muted">
                                Length: from 5 to 25. Enter only latin characters, numbers and _ 
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                minLength="5" 
                                maxLength="20" 
                                type="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.handleFieldChange("password", this)}
                                name="password"
                                required
                            />
                            <Form.Text className="text-muted">
                                Length of password should be from 5 to 20
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check 
                                type="checkbox" 
                                label="Remember me"
                                name="remember"
                                checked={this.state.remember}
                                onChange={this.handleCheckBoxChange}
                            />
                        </Form.Group>
                        <Button className="mx-auto d-block" variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            )}
            </UserContext.Consumer>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(Login);
