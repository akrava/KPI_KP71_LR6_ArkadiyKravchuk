import React from "react";
import UserContext from './UserContext';
import PropTypes from "prop-types";
import Cookies from "js-cookie";


export default class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.logpass = "arkadiy2";
        this.state = {
            user: {
                name: '',
                username: '',
                logined: false
            }
        };
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    user: this.state.user,
                    login: (username, password, remember) => {
                        const name = 'Arkadiy';
                        if (username === password && username === this.logpass) {
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
                    },
                    logout: () => {
                        Cookies.remove('username');
                        Cookies.remove('password');
                        Cookies.remove('name');
                        this.setState({
                            user: {
                                ...this.state.user,
                                name: '',
                                username: '',
                                logined: false,
                            }
                        });
                    }
                }}
            >
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