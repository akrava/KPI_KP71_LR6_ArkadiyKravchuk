import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "@configs/UserProvider";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class Header extends React.Component {
    renderUserInfo(context) {
        return (
            <NavDropdown 
                title={context.user.name} 
                id="collasible-nav-dropdown"
            >
                <NavDropdown.Item onClick={context.logout}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    renderButtonLogin(history) {
        return (
            <Button variant="light" onClick={() => history.push("/")}>Login</Button>
        );
    }

    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand>
                            <Link className="header__link" to="/">
                                Weather forecast
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="header__link" to="/dashboard">
                                    Forecast
                                </Link>
                            </Nav>
                            <Nav>
                                {context.user.logined 
                                    ? this.renderUserInfo(context) 
                                    : this.renderButtonLogin(this.props.history)
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> 
                )}
            </UserContext.Consumer>
        );
    }
}

Header.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(Header);