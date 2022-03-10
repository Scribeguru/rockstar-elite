import React, { useRef } from 'react';
import { Row, Col, Input } from 'reactstrap';

export default function SelectedList({ exercise }) {

	const setsFocus = useRef();
	const repsFocus = useRef();
	const weightFocus = useRef();
	const lengthFocus = useRef();

	function focusOnSets() {
		setsFocus.current.focus();
	}

	function focusOnReps() {
		repsFocus.current.focus();
	}

	function focusOnWeight() {
		weightFocus.current.focus();
	}

	function focusOnLength() {
		lengthFocus.current.focus();
	}

	function parseType() {
		const strength =
			<Row>
				<Col>
					<Input ref={setsFocus} onTouchStart={focusOnSets} name={exercise.name} placeholder="sets" />
				</Col>
				<Col>
					<Input ref={repsFocus} onTouchStart={focusOnReps} name={exercise.name} placeholder="reps" />
				</Col>
				<Col>
					<Input ref={weightFocus} onTouchStart={focusOnWeight} name={exercise.name} placeholder="weight" />
				</Col>
			</Row>;
		const cardio = <Input ref={lengthFocus} onTouchStart={focusOnLength} name={exercise.name} placeholder="length" />
		const type = (exercise.strengthOrCardio === "strength") ? strength : cardio;
		return type;
	}

	return (
		<>
			<em>{exercise.name}</em>
			{parseType()}
		</>
	);
}