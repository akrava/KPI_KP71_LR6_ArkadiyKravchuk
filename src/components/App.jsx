import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "@services/ScrollToTop";
import Header from "@components/header/Header";
import Main from "@components/main/Main";
import Footer from "@components/footer/Footer";
import UserProvider from "@configs/UserProvider";


export default class App extends React.Component {
    render() {
        return (
            <UserProvider>
                <BrowserRouter>
                    <ScrollToTop>
                        <Header />
                        <Main />
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </UserProvider>
        );
    }
}