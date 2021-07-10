import { NavLink } from 'react-router-dom';

export default function Home() {
    return(
        <>
            <div className="container-fluid grid">
                <div className="row mt-1 mx-1">
                    <div className="col text-center my-auto cat">
                        <h5>Name</h5>
                    </div>
                    <div className="col text-center cat">
                        <h5>Details</h5>
                    </div>
                    <div className="col text-center my-auto cat">
                        <h5>Intensity</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col" draggable="true">
                        
                    </div>
                </div>
            </div>
            <footer className="jumbotron-fluid">
                <div className="row mt-4">
                    <div className="col text-center">
                        <button className="btn btn-lg btn-outline-secondary shadow">
                            Archive Log
                        </button>
                    </div>
                    <div className="col text-center">
                        <NavLink to="/arsenal">
                            <button className="btn btn-lg btn-outline-secondary shadow">
                                Arsenal
                            </button>
                        </NavLink>
                    </div>
                </div>
            </footer>
        </>
    );
}