import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './HeaderComponent';
import Execute from './ExecuteComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {

    const [exerciseArr, setExerciseData] = useState([]);

    useEffect(() => {
        const myExercises = localStorage.getItem('my-exercises');
        if (myExercises) {
            setExerciseData(JSON.parse(myExercises));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('my-exercises', JSON.stringify(exerciseArr));
    });

    return (
        <>
            <Header />
                <Switch>
                    <Route exact path="/"
                    render={() => <Execute
                        exerciseArr={exerciseArr}
                        setExerciseData={setExerciseData}
                    />} />

                    <Route path="/arsenal"
                    render={() => <Arsenal 
                        exerciseArr={exerciseArr}
                        setExerciseData={setExerciseData}
                    />} />

                    <Route path="/about" component={About} />
                </Switch>
        </>
    );
}