import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Modal, ModalHeader, ModalBody, Container, Row, Col, Button, Input, Label, Form } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import SelectedList from './SelectedListComponent';

export default function Execute(props) {

	const [selectArr, setList] = useState(JSON.parse(localStorage.getItem('selected-exercises')) || []);
	const [isMetric, setSys] = useState(!!JSON.parse(localStorage.getItem('is-metric')));
	const [dragging, setdragging] = useState(false);
	const [comments, setComments] = useState(false);
	const [isModalOpen, modalSwitch] = useState(false);

	const dragExercise = useRef();
	const dragTarget = useRef();
	const dragNode = useRef();
	const triggerValuePopulation = useRef();

	useEffect(() => {
		props.setLoggedIn(true);
		localStorage.setItem('selected-exercises', JSON.stringify(selectArr));
		if (selectArr.length) {
			triggerValuePopulation.current.click();
		}
	});

	function toggleModal() {
		modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
	}

	function handleArchiveSubmit(e) {
		e.preventDefault();

		let selectedNames = selectArr.map(exercise => exercise.name);
		let keys = Object.keys(localStorage).filter(key => key !== "selected-exercises");
		let details = keys.map(key => {
			return { [key]: JSON.parse(localStorage.getItem(key)) }
		});
		let selectedDetails = keys.map(key => {
			return (selectedNames.includes(key)) ? { [key]: JSON.parse(localStorage.getItem(key)) } : null;
		}).filter(detail => !!detail === true);
		if (e.target[e.target.length - 5].value) {
			try {
				fetch(baseUrl + 'userWeight', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						weight: parseInt(details.find(detail => detail['uWeight'])['uWeight'][e.target[e.target.length - 5].placeholder], 10),
						systemIsMetric: !!details.find(detail => detail['is-metric']),
						lastMeasured: new Date()
					})
				})
					.then(res => {
						return res.json();
					})
					.then(userWeightData => {
						props.setUserWeight(userWeightData);
						return userWeightData;
					})
					.then(userWeightData => {
						fetch(baseUrl + 'archive', {
							method: 'POST',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								userWeight: userWeightData._id,
								exerciseDetails: selectedDetails,
								date: new Date(),
								comments: details.find(detail => {
									return detail.comments
								})['comments'][e.target[e.target.length - 4].placeholder]
							})
						})
							.then(res => {
								return res.json();
							})
							.then(archiveData => {
								props.setArchive(archiveData);
								console.log(archiveData);
								alert('Archive logged.');
							})
					});
			}
			catch (err) {
				console.log(err);
			}
		} else {
			try {
				fetch(baseUrl + 'archive', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						exerciseDetails: selectedDetails,
						date: new Date(),
						comments: details.find(detail => {
							return detail.comments
						})['comments'][e.target[e.target.length - 4].placeholder]
					})
				})
					.then(res => {
						return res.json();
					})
					.then(archiveData => {
						props.setArchive(archiveData);
						console.log(archiveData);
						alert('Archive logged.');
					});
			} catch (err) {
				console.log(err);
			}
		}
	}

	function handleWorkoutSubmit(e) {
		e.preventDefault();

		try {
			fetch(baseUrl + 'workouts', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: e.target[0].value,
					exercises: selectArr.map(exercise => exercise._id)
				})
			})
				.then(res => {
					return res.json();
				})
				.then(workoutData => {
					props.setWorkouts([...props.workouts, workoutData]);
					console.log(workoutData);
					toggleModal();
					alert('Workout saved.')
				});
		}
		catch (err) {
			console.log(err);
			toggleModal();
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
		(selectArr.length && e.code.substring(0, 5) === "Digit" || e.code === "Backspace") ?
			e.target.readOnly = false : e.target.readOnly = true;
	}

	function toggleMeasurement(e) {
		setSys(isMetric => isMetric = !isMetric);
		localStorage.setItem('is-metric', !JSON.parse(localStorage.getItem('is-metric')));
		console.log(isMetric);
	}

	function consolidateDetails(e) {
		localStorage.setItem(e.target.name, JSON.stringify({
			...JSON.parse(localStorage.getItem(e.target.name)),
			[e.target.placeholder]: e.target.value
		}));
	}

	function loadFormValues(e) {
		e.preventDefault();

		let keys = Object.keys(localStorage).filter(key => key !== "selected-exercises" && key !== "is-metric");
		let details = keys.map(key => {
			return { [key]: JSON.parse(localStorage.getItem(key)) }
		});

		for (let i = 1; i < e.target.form.length - 3; i++) {
			let fieldData = details.filter(obj => obj[e.target.form[i].name]);
			if (fieldData.length) {
				e.target.form[i].value = fieldData[0][e.target.form[i].name][e.target.form[i].placeholder] || null;
			}
		}

		if (e.target.form[e.target.form.length - 4].value) {
			setComments(true);
		}
	}

	return (
		<>
			{(selectArr.length) ?
				<>
					<Form onChange={e => consolidateDetails(e)} onSubmit={e => handleArchiveSubmit(e)} autoComplete="off">
						<button ref={triggerValuePopulation} onClick={e => loadFormValues(e)} hidden />
						<Container form fluid className="grid">
							{mappedSelect}
						</Container>
						<Jumbotron fluid>
							<Row className={(selectArr.length) ? "mt-5" : "mt-5 greyed-out"}>
								<Col className="text-center mx-5">
									<Label htmlFor="uWeight">Weigh-in Results:</Label>
									<Input onKeyDown={e => uWeight(e)} id="uWeight" name="uWeight" placeholder='Enter your weight' />
									<span className="exercise-name" onClick={e => toggleMeasurement(e)}>({(isMetric) ? 'kgs' : 'lbs'})</span>
								</Col>
							</Row>
							<Row className="mt-4">
								<Col className={(selectArr.length) ? "text-center my-3" : "text-center my-3 greyed-out"}>
									<Label htmlFor="comments">Comments:</Label><br />
									<textarea id="comments" name="comments" onChange={e => (manageArchive(e))} placeholder="Enter any thoughts or notes regarding your workout here — you can only archive your workout after doing this." />
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
										className="shadow-none"
										size="lg"
										color="secondary"
										outline
										onClick={toggleModal}
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
					<Modal isOpen={isModalOpen} toggle={toggleModal}>
						<ModalHeader toggle={toggleModal}>
							<h4 className="title">Save Workout to Arsenal</h4>
						</ModalHeader>
						<ModalBody className="text-center">
							<Form onSubmit={e => handleWorkoutSubmit(e)} autoComplete='off'>
								<Label htmlFor="workoutName" name="workoutName">Name This Workout:</Label>
								<Input id="workoutName" name="workoutName" required />
								<Button id="saveNewWorkout"
									name="saveNewWorkout"
									type="submit"
									className="shadow-none mt-4"
									size="lg"
									color="secondary"
									outline
								>
									Save
								</Button>
							</Form>
						</ModalBody>
					</Modal>
				</> :
				<Row>
					<Col xs="12" className="text-center mt-5">
						<h2 className="pt-5 text-center">Select some exercises from Arsenal.</h2>
					</Col>
					<Col xs="12" className="text-center mt-4">
						<Link to="/arsenal">
							<Button className="shadow-none" size="lg" color="secondary" outline>
								Arsenal
							</Button>
						</Link>
					</Col>
				</Row>}
		</>
	);
}