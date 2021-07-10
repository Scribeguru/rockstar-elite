import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <header className="jumbotron jumbotron-fluid">
            <div className="container mb-4">
                <div className="row pt-2">
                    <div className="col-sm-3 text-center">
                        <h4>MM/DD/YYYY</h4>
                    </div>
                    <div className="col-order-first col-sm-6 text-center">
                        <h1><NavLink to="/" className="links title">Rockstar Elite</NavLink></h1>
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
                        <NavLink to="/about" className="links">
                            <h5>About</h5>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}