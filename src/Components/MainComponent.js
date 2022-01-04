import { Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Login from './LoginComponent';
import Header from './HeaderComponent';
import Execute from './ExecuteComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {

	const [exerciseArr, setExerciseData] = useState([]);
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [userWeight, setUserWeight] = useState([]);
	const [archive, setArchive] = useState([]);
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (isLoggedIn) {
			try {
				fetch(baseUrl + 'exercises', {
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				})
					.then(res => {
						console.log(res, "exercise response");
						return res.json()
					})
					.then(exercises => {
						console.log(exercises);
					})
			}
			catch (err) {
				alert(err);
			}
		}
	}, [exercises, isLoggedIn])//every time <Main /> renders, data gets fetched from the server and placed into state.

	useEffect(() => {
		localStorage.setItem('isLoggedIn', Boolean(isLoggedIn));
	});

	useEffect(() => {
		let loginStatus = localStorage.getItem('isLoggedIn');
		if (loginStatus) {
			setLoggedIn(Boolean(loginStatus));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('my-exercises', JSON.stringify(exerciseArr));
	});

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
			<Header
				isLoggedIn={isLoggedIn}
				setLoggedIn={setLoggedIn}
				userWeight={userWeight} />
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
						exercises={exercises}
						workouts={workouts}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
					/>} />
				<Route path="/execute"
					render={() => <Execute
						exerciseArr={exerciseArr}
						setExerciseData={setExerciseData}
						exercises={exercises}
						workouts={workouts}
						userWeight={userWeight}
						archive={archive}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setUserWeight={setUserWeight}
						setArchive={setArchive}
					/>} />
				<Route path="/about" component={About} />
				{(isLoggedIn) ? <Redirect to="/arsenal" /> : <Redirect to="/login" />}
			</Switch>
		</>
	);
}