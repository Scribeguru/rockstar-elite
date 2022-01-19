import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button, Input, Label, Form } from 'reactstrap';
import SelectedList from './SelectedListComponent';

export default function Execute(props) {

	const [selectArr, setList] = useState(JSON.parse(localStorage.getItem('selected-exercises')) || []);
	const [measurementSys, setSys] = useState(!!JSON.parse(localStorage.getItem('measurement-system')));
	const [dragging, setdragging] = useState(false);
	const [comments, setComments] = useState(false);

	const dragExercise = useRef();
	const dragTarget = useRef();
	const dragNode = useRef();
	const triggerValuePopulation = useRef();

	useEffect(() => {
		props.setLoggedIn(true);
		localStorage.setItem('selected-exercises', JSON.stringify(selectArr));
		triggerValuePopulation.current.click();
	}, [selectArr, setSys]);

	function handleSubmit(e) {
		e.preventDefault();
		// let archive = {};
		// let workout = {};
		console.log(e);
		if (e.nativeEvent.submitter.name === "archiveLog") {
			console.log(e);
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
		(selectArr.length) ? e.target.readOnly = false : e.target.readOnly = true;
	}

	function checkComments(e) {
		if (!comments) {
			e.preventDefault();
		}
	}

	function uWeight(e) {
		(selectArr.length && e.code.substring(0, 5) === "Digit" || e.code === "Backspace") ?
			e.target.readOnly = false : e.target.readOnly = true;
	}

	function toggleMeasurement(e) {
		setSys(measurementSys => measurementSys = !measurementSys);
		localStorage.setItem('measurement-system', !JSON.parse(localStorage.getItem('measurement-system')));
		console.log(measurementSys);
	}

	function consolidateDetails(e) {
		localStorage.setItem(e.target.name, JSON.stringify({
			...JSON.parse(localStorage.getItem(e.target.name)),
			[e.target.placeholder]: e.target.value
		}));
	}

	function loadFormValues(e) {
		e.preventDefault();

		console.log(JSON.parse(localStorage.getItem('comments'))[e.target.form[e.target.form.length-4].placeholder]);
		if (JSON.parse(localStorage.getItem('comments'))[e.target.form[e.target.form.length-4].placeholder]) {
			setComments(true)
		}

		let keys = Object.keys(localStorage).filter(key => key !== "selected-exercises" && key !== "measurement-system");
		let details = keys.map(key => {
			return { [key]: JSON.parse(localStorage.getItem(key)) }
		});

		for (let i = 1; i < e.target.form.length - 3; i++) {
			let fieldData = details.filter(obj => obj[e.target.form[i].name]);
			if (fieldData.length) {
				e.target.form[i].value = fieldData[0][e.target.form[i].name][e.target.form[i].placeholder] || null;
			}
		}
	}

	return (
		<>
			<Form onChange={e => consolidateDetails(e)} onSubmit={e => handleSubmit(e)} autoComplete="off">
				<button ref={triggerValuePopulation} onClick={e => loadFormValues(e)} hidden />
				<Container form fluid className="grid">
					{mappedSelect}
				</Container>
				<Jumbotron fluid>
					<Row className={(selectArr.length) ? "mt-5" : "mt-5 greyed-out"}>
						<Col className="text-center mx-5">
							<Label htmlFor="uWeight">Weigh-in Results:</Label>
							<Input onKeyDown={e => uWeight(e)} id="uWeight" name="uWeight" placeholder='Enter your weight' />
							<span className="exercise-name" onClick={e => toggleMeasurement(e)}>({(measurementSys) ? 'kgs' : 'lbs'})</span>
						</Col>
					</Row>
					<Row className="mt-4">
						<Col className={(selectArr.length) ? "text-center my-3" : "text-center my-3 greyed-out"}>
							<Label htmlFor="comments">Comments:</Label><br />
							<textarea id="comments" readOnly={(selectArr.length) ? false : true} name="comments" onChange={e => (manageArchive(e))} placeholder="Enter any thoughts or notes regarding your workout here — you can only archive your workout after doing this." />
						</Col>
						<Col xs="12" className={(selectArr.length) ? "text-center my-3" : "text-center my-3 greyed-out"}>
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
						<Col xs="12" className={(selectArr.length) ? "text-center my-2" : "text-center my-2 greyed-out"}>
							<Button
								id="saveWorkout"
								name="saveWorkout"
								type="submit"
								className="shadow-none"
								size="lg"
								color="secondary"
								outline
							>
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