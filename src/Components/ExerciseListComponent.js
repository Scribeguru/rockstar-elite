import React, { useEffect } from 'react';
import { Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function ExerciseList({ workouts, setWorkouts, selected, setSelected, exercise, exercises, setExercises }) {

	useEffect(() => {
		localStorage.setItem('selected-exercises', JSON.stringify(exercises.filter(exercise => exercise.selected)));
	}, [selected, exercises]);

	function toggleSelect() {
		(selected.includes(exercise)) ? setSelected(selected.filter(toKeep => toKeep !== exercise))
			: setSelected([...selected, exercise]);
		exercise.selected = !exercise.selected;
	}

	function deleteExercise() {
		let workoutExercises = workouts.map(workout => workout.exercises).flat()
			.map(exercise => exercise.name + exercise.strengthOrCardio);
		if (workoutExercises.includes(exercise.name + exercise.strengthOrCardio) && workoutExercises.length > 1) {
			alert('The workout(s) containing this exercise will no longer include it.');
		}
		if (workoutExercises.includes(exercise.name + exercise.strengthOrCardio) && workoutExercises.length === 1) {
			alert('The workout(s) containing this exercise will no longer include it.\n\nDeleting the final exercise in a workout will also delete the workout.');
		}
		try {
			fetch(baseUrl + 'exercises/' + exercise._id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => {
					return res.json();
				})
				.then(res => {
					setExercises(exercises.filter(exercise => exercise._id !== res._id));
					setWorkouts([...workouts]);
				});
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Col sm="1" className="">
				<i onClick={deleteExercise} className="exercise-option fa fa-trash fa-sm" />
			</Col>
			<Col
				className={`${exercise.selected ? 'exercise-selected' : 'exercise-name'} text-center`}
				onClick={toggleSelect}
			>
				{exercise.name} {exercise.selected ? <span className="ml-1"><em>(selected)</em></span> : null}
			</Col>
			<Col sm="1" className="exercise-option">
				<i className="fa fa-pencil" hidden />
			</Col>
		</>
	);
}