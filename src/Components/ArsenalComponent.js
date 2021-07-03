import React, { Component } from 'react';
import Exercises from './ExercisesComponent';

class Arsenal extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center grid">
                        <h4>Saved Workouts</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center grid">
                        <h5><u>Strength</u></h5>
                    </div>
                    <div className="col text-center grid">
                        <h5><u>Cardio</u></h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Arsenal;