import { Route, Switch, Redirect, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Login from './LoginComponent';
import Header from './HeaderComponent';
import Execute from './ExecuteComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {

	const [isLoggedIn, setLoggedIn] = useState();

	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [userWeight, setUserWeight] = useState([]);
	const [archive, setArchive] = useState([]);

	const redirectToLogin = useRef();

	function loginRedirect() {
		redirectToLogin.current.click();
	}

	useEffect(() => {
		if (isLoggedIn) {
			try {
				fetch(baseUrl + 'users/isLoggedIn', {
					credentials: 'include'
				})
					.then(res => {
						return res.json();
					})
					.then(res => {
						if (!res) {
							loginRedirect();
						}
					})

				Promise.all([
					fetch(baseUrl + 'exercises', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'workouts', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'userWeight', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'archive', {
						credentials: 'include'
					})
				])
					.then(res => {
						return (Promise.all(res.map(response => {
							console.log(response);
							return response.json();
						})));
					})
					.then(data => {
						console.log(data);
						console.log('exercises: ', data[0]);
						console.log('workouts: ', data[1]);
						console.log('userWeight: ', data[2]);
						console.log('archive: ', data[3]);

						setExercises([...data[0]]);
						setWorkouts([...data[1]]);
						setUserWeight(data[2]);
						setArchive([...data[3]]);
					})
					.catch(err => {
						console.log(err);
					})
			}
			catch (err) {
				alert(err);
			}
		}
	}, [isLoggedIn, setExercises, setWorkouts, setUserWeight, setArchive]);

	return (
		<>
			<Link to="/login" ref={redirectToLogin} replace hidden />
			<Header
				isLoggedIn={isLoggedIn}
				userWeight={userWeight}
				archive={archive}
				setArchive={setArchive} />
			<Switch>
				<Route path="/login"
					render={() => <Login
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setUserWeight={setUserWeight}
						setArchive={setArchive}
						isLoggedIn={isLoggedIn}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/arsenal"
					render={() => <Arsenal
						exercises={exercises}
						workouts={workouts}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/execute"
					render={() => <Execute
						workouts={workouts}
						exercises={exercises}
						archive={archive}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setUserWeight={setUserWeight}
						setArchive={setArchive}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/about" component={About} />
				{(isLoggedIn) ? <Redirect to="/arsenal" /> : <Redirect to="/login" />}
			</Switch>
		</>
	);
}