import { NavLink } from 'react-router-dom';
import Exercises from './ExercisesComponent';

export default function Arsenal() {
    return(
        <>
            <div className="container-fluid grid">
                <div className="row mt-1 mx-1">
                    <div className="col text-center cat">
                        <h5>Saved Workouts</h5>
                    </div>
                </div>
                <div className="row mx-1">
                    <div className="col text-center cat">
                        <h5>Strength</h5>
                    </div>
                    <div className="col text-center cat">
                        <h5>Cardio</h5>
                    </div>
                </div>
                
            </div>
            <footer className="jumbotron-fluid">
            <div className="row mt-4">
                <div className="col text-center">
                    <button className="btn btn-lg btn-outline-secondary shadow">
                        Forge
                    </button>
                </div>
                <div className="col text-center">
                    <NavLink to="/">
                        <button className="btn btn-lg btn-outline-secondary shadow">
                            Execute
                        </button>
                    </NavLink>
                </div>
            </div>
        </footer>
    </>
    );
}