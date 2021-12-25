import { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './LoginComponent';
import Header from './HeaderComponent';
import Execute from './ExecuteComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {

	const [exerciseArr, setExerciseData] = useState([]);
	const [workoutData, setWorkoutData] = useState([]);
	const [archiveData, setArchiveData] = useState({});
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const myExercises = localStorage.getItem('my-exercises');
		if (myExercises) {
			setExerciseData(JSON.parse(myExercises));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('my-exercises', JSON.stringify(exerciseArr));
	});

	const header = (
		<Header />
	);

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				setLoggedIn={setLoggedIn} />
			<Switch>
				<Route path="/login"
					render={() => <Login
						isLoggedIn={isLoggedIn}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/arsenal"
					render={() => <Arsenal
						exerciseArr={exerciseArr}
						setExerciseData={setExerciseData}
					/>} />
				<Route path="/execute"
					render={() => <Execute
						exerciseArr={exerciseArr}
						setExerciseData={setExerciseData}
						setArchiveData={setArchiveData}
						setWorkoutData={setWorkoutData}
					/>} />
				<Route path="/about" component={About} />
				<Redirect to='/login' />
			</Switch>
		</>
	);
}