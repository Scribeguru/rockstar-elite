import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main(props) {

    const [exercises, setExercises] = useState();
    const addExercises = (exercise) => {
        let newExercises = [...exercises, exercise];
        setExercises(newExercises);
    }

    return (
        <>
            <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/arsenal" render={() => <Arsenal exercises={exercises} addExercises={addExercises} />} />
                    <Route path="/about" component={About} />
                </Switch>
        </>
    );
}