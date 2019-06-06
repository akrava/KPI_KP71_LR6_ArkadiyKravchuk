import React from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const UserContext = React.createContext();

export default class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.logpass = "arkadiy2";
        this.name = 'Arkadiy';
        this.state = {
            user: {
                name: '',
                username: '',
                logined: false
            }
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(username, password, remember) {
        const { logpass, name } = this;
        if (username === password && username === logpass) {
            if (remember) {
                Cookies.set('username', username);
                Cookies.set('password', password);
                Cookies.set('name', name);
            }
            this.setState({
                user: {
                    name: name,
                    username: this.logpass,
                    logined: true,
                }
            });
            return true;
        }
        return false;
    }

    logout() {
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('name');
        this.setState({
            user: {
                name: '',
                username: '',
                logined: false,
            }
        });
    }

    render() {
        const { user } = this.state;
        const { login, logout } = this;
        return (
            <UserContext.Provider value={{ user, login, logout }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};