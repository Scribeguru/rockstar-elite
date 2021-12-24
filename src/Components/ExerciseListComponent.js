import React, { useState } from 'react';
import { Col } from 'reactstrap';

export default function ExerciseList({ exercise }) {

	const [selected, setSelected] = useState(false)

	function toggleSelect() {
		setSelected(!selected);
		exercise.selected = !selected;
	}

	return (
		<>
			<Col sm="1" className="exercise-option">
				<i className="fa fa-trash fa-sm" />
			</Col>
			<Col
				className={`${selected ? 'exercise-selected' : 'exercise-name'} text-center`}
				onClick={() => toggleSelect()}
			>
				{exercise.eName} {selected ? <span className="ml-1"><em>(selected)</em></span> : null}
			</Col>
			<Col sm="1" className="exercise-option">
				<i className="fa fa-pencil" hidden />
			</Col>
		</>
	);
}