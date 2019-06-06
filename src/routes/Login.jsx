import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertError from "@components/partial/AlertError";
import { UserContext } from "@configs/UserProvider";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            login: '',
            password: '',
            remember: false,
            errorLogin: false,
            redirectTo: null
        };
    }

    handleCloseError() {
        this.setState({ errorLogin: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setButtonStatus();
            const inputs = this.getAllFormInputs(form);
            inputs.forEach(x => this.checkValidityInput(x));
            return;
        }
        const { login, password, remember } = this.state;
        const { context } = this.props;
        const isLogined = context.login(login, password, remember);
        if (isLogined) {
            this.setState({ errorLogin: false, redirectTo: "/dashboard" });
        } else {
            this.setState({ errorLogin: true });
        }
    }

    getAllFormInputs(form) {
        return [...form.elements].filter(x => x.getAttribute("type") !== "submit");
    }

    handleFieldChange(event, field) {
        const input = event.target;
        if (typeof input.value === "undefined") {
            return;
        }
        this.setState({ [field]: input.value });
        this.checkValidityInput(input);
        this.setButtonStatus();
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

    componentDidMount() {
        const username = Cookies.get('username');
        const password = Cookies.get('password');
        const { context } = this.props;
        const isLogined = context.login(username, password, true);
        if (isLogined) {
            this.setState({ 
                errorLogin: false,
                redirectTo: "/dashboard"
            });
        }
    }

    render() {
        const { redirectTo, remember, password, login } = this.state;
        const { 
            handleFieldChange, handleSubmit, handleCheckBoxChange, handleCloseError 
        } = this;
        return (
            <>
                {redirectTo && <Redirect to={redirectTo} />}
                <h1 className="text-center mb-2">Login to the web app</h1>
                <div>
                    {this.state.errorLogin && 
                        <AlertError 
                            closedCb={handleCloseError} 
                            heading="Error login" 
                            text="No such user found" 
                        />
                    }
                </div>
                <Form 
                    className="form-default p-4 mx-auto" 
                    onSubmit={handleSubmit} 
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
                            value={login}
                            onChange={e => handleFieldChange(e, "login")}
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
                            value={password}
                            onChange={e => handleFieldChange(e, "password")}
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
                            checked={remember}
                            onChange={handleCheckBoxChange}
                        />
                    </Form.Group>
                    <Button className="mx-auto d-block" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </>
        );
    }
}


Login.propTypes = {
    context: PropTypes.object.isRequired
};

const LoginWithContext = props => (
    <UserContext.Consumer>
        {context => <Login {...props} context={context} />}
    </UserContext.Consumer>
);

export default LoginWithContext;