import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Arsenal from './ArsenalComponent';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/arsenal" component={Arsenal} />
                    </Switch>
            </>
        );
    }
}

export default Main;