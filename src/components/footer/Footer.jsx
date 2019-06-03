import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container py-2">
                    <div className="col mx-auto text-center">
                        <span className="text-monospace">All rights reserved (c) 2019</span>
                    </div>
                </div>
            </footer>
        );
    }
}