import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function ExerciseList({ exercise, exercises, setExercises }) {

	const [selected, setSelected] = useState(false);

	useEffect(() => {
		localStorage.setItem('selected-exercises', JSON.stringify(exercises.filter(exercise => exercise.selected)));
	}, [selected]);

	function toggleSelect() {
		setSelected(!selected);
		exercise.selected = !selected;
	}

	function deleteExercise() {
		try {
			fetch(baseUrl + 'exercises/' + exercise._id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
			})
				.then(res => {
					return res.json();
				})
				.then(res => {
					setExercises(exercises.filter(exercise => exercise._id !== res._id));
					console.log(res);
				});
		}
		catch (err) {
			alert(err);
		}
	}

	return (
		<>
			<Col sm="1" className="exercise-option">
				<i onClick={deleteExercise} className="fa fa-trash fa-sm" />
			</Col>
			<Col
				className={`${selected ? 'exercise-selected' : 'exercise-name'} text-center`}
				onClick={() => toggleSelect()}
			>
				{exercise.name} {selected ? <span className="ml-1"><em>(selected)</em></span> : null}
			</Col>
			<Col sm="1" className="exercise-option">
				<i className="fa fa-pencil" hidden />
			</Col>
		</>
	);
}