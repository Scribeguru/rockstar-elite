import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center grid">
                        <h4>Workout Name</h4>
                    </div>
                    <div className="col text-center grid">
                        <h4>Sets, Reps, Weight / Duration or Distance</h4>
                    </div>
                    <div className="col text-center grid">
                        <h4>Intensity 1-10</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col home-grid" draggable="true">
                        This is where the exercises component will render
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;