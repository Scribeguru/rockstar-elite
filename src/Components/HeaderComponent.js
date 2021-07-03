import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <header className="jumbotron jumbotron-fluid">
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <h4>MM/DD/YYYY</h4>
                        </div>
                        <div className="col-order-first col-sm-6 text-center">
                            <h1><u>Rockstar Elite</u></h1>
                        </div>
                        <div className="col-sm-3 text-center">
                            <h4>Last Weigh-in</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <h5>Archive</h5>
                        </div>
                        <div className="col text-center">
                            <h5>About</h5>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;