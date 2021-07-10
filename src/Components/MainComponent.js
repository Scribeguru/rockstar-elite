import { Route, Switch } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {
    return (
        <>
            <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/arsenal" component={Arsenal} />
                    <Route path="/about" component={About} />
                </Switch>

        </>
    );
}