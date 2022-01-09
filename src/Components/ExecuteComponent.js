import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import SelectedList from './SelectedListComponent';

export default function Execute(props) {

	const [selectArr, setList] = useState();
	const [dragging, setdragging] = useState(false);
	const [comments, setComments] = useState(false);

	useEffect(() => {
		props.setLoggedIn(true)
	});

	const dragExercise = useRef();
	const dragTarget = useRef();
	const dragNode = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		// const archive = {};
		// const workout = {};
		console.log(e);
		if (e.nativeEvent.submitter.name === "archiveLog") {
			//gather all the data and toss it into the archive obj.
		}
		if (e.nativeEvent.submitter.name === "saveWorkout") {
			//gather all the data and toss it into the workout obj.
		}
	}

	function moveItem(from, to) {
		let newList = JSON.parse(JSON.stringify(selectArr));
		let f = newList.splice(from, 1)[0];
		newList.splice(to, 0, f);
		return setList(newList);
	}

	function handleDragStart(e, eIndex) {
		dragExercise.current = eIndex;
		dragNode.current = e.target;
		dragNode.current.addEventListener('dragend', handleDragEnd)
		setdragging(true);
	}

	function handleDragEnter(eIndex) {
		dragTarget.current = eIndex;
	}

	function handleDragOver(e) {
		e.preventDefault();
	}

	function handleDrop() {
		moveItem(dragExercise.current, dragTarget.current);
	}

	function handleDragEnd() {
		setdragging(false);
		dragNode.current.removeEventListener('dragend', handleDragEnd);
		dragExercise.current = null;
		dragNode.current = null;
		dragTarget.current = null;
	}

	function setStyle(eIndex) {
		if (eIndex === dragTarget.current) {
			return 'drag-target selected';
		} else return 'selected';
	}

	let mappedSelect = selectArr.map((exercise, eIndex) => (
		<Row
			xs="12"
			key={exercise.id}
		>
			<Col
				className={dragging ? setStyle(eIndex) : 'selected'}
				draggable
				onDragStart={(e) => { handleDragStart(e, eIndex) }}
				onDragEnter={dragging ? (e) => handleDragEnter(eIndex) : null}
				onDragOver={dragging ? (e) => handleDragOver(e) : null}
				onDrop={() => { handleDrop() }}
			>
				<SelectedList exercise={exercise} />
			</Col>
		</Row>
	));

	function manageArchive(e) {
		(e.target.value) ? setComments(true) : setComments(false);
	}

	function checkComments(e) {
		if (!comments) {
			e.preventDefault();
		}
	}

	function uWeight(e) {
		(e.code.substring(0, 5) !== "Digit" && e.code !== "Backspace") ?
			e.target.readOnly = true : e.target.readOnly = false;
	}

	return (
		<>
			<Form onSubmit={e => handleSubmit(e)} autoComplete="off">
				<Container form fluid className="grid">
					{mappedSelect}
				</Container>
				<Jumbotron fluid>
					<Row className="mt-5">
						<Col className="text-center mx-5">
							<Label htmlFor="uWeight">Weigh-in Results:</Label>
							<Input onKeyDown={e => uWeight(e)} id="uWeight" name="uWeight" placeholder='Enter your weight' />
						</Col>
					</Row>
					<Row className="mt-4">
						<Col className="text-center my-3">
							<Label htmlFor="comments">Comments:</Label><br />
							<textarea id="comments" name="comments" onChange={e => (manageArchive(e))} placeholder="Enter any thoughts or notes regarding your workout here — you can only archive your workout after doing this." />
						</Col>
						<Col xs="12" className="text-center my-3">
							<Button
								id="archiveLog"
								name="archiveLog"
								type="submit"
								className={comments ? "shadow-none text-nowrap" : "shadow-none text-nowrap greyed-out"}
								onClick={e => { checkComments(e) }}
								size="lg"
								color="secondary"
								outline
							>
								Archive Log
							</Button>
						</Col>
						<Col xs="12" className="text-center my-2">
							<Button
								id="saveWorkout"
								name="saveWorkout"
								type="submit"
								className="shadow-none"
								size="lg"
								color="secondary"
								outline>
								Save Workout
							</Button>
						</Col>
						<Col xs="12" className="text-center my-2">
							<Link to="/arsenal">
								<Button className="shadow-none" size="lg" color="secondary" outline>
									Arsenal
								</Button>
							</Link>
						</Col>
					</Row>
				</Jumbotron>
			</Form>
		</>
	);
}