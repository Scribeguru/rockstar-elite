import React from 'react';
import ExerciseList from './ExerciseListComponent';
import SavedWorkouts from './SavedWorkoutsComponent'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Jumbotron, Container, Col, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Arsenal(props) {

	const [isModalOpen, modalSwitch] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('selected-exercises')) || []);

	useEffect(() => {
		props.setLoggedIn(true);
	});

	function toggleModal() {
		modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
	}

	function handleSubmit(e) {
		e.preventDefault();

		let eName = e.target[0].value;
		let eType = e.target[1].checked ?
			e.target[1].value :
			e.target[2].checked ?
				e.target[2].value : alert('All new exercises must have an assigned Type.');

		if (eType) {
			setLoading(true);
			try {
				fetch(baseUrl + 'exercises', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: eName,
						strengthOrCardio: eType
					})
				})
					.then(res => {
						return res.json();
					})
					.then(res => {
						props.setExercises([...props.exercises, res]);
						setLoading(false);
						toggleModal();
						console.log(props.exercises);
					});

			}
			catch (err) {
				alert(err);
				setLoading(false);
				toggleModal();
			}
		}
	}

	const loading = (
		<>
			<Col xs="4" />
			<Col>
				<div className="stage">
					<div className="dot-carousel"></div>
				</div>
			</Col>
			<Col xs="4" />
		</>
	);

	return (
		<>
		{(props.exercises.length) ? 
		<Container fluid={true} className="grid">
		<Row className="mt-1 mx-sm-2">
			<Col className="text-center cat">
				<h5>Your Workouts</h5>
			</Col>
		</Row>
		<Row>
			<Col className="text-center my-auto mb-3">
				{(props.workouts.length) ? props.workouts.map(workout => {
					return (
						<>
							<Row className="my-4" key={workout._id}>
								<SavedWorkouts selected={selected} setSelected={setSelected} workouts={props.workouts} setWorkouts={props.setWorkouts} workout={workout}
									exercises={props.exercises} />
							</Row>
							<hr />
						</>
					);
				}) : <div>Create your first workout by using the <span className="title">Save Workout</span> button in <span className="title">Execute</span>.</div>}
			</Col>
		</Row>
		<Row className="mt-1 mx-sm-2">
			<Col className="text-center cat">
				<h5>Your Exercises</h5>
			</Col>
		</Row>
		<Row className="mt-3">
			<Col className="cat mb-3">
				<h5 className="text-center mb-0">Strength</h5>
				{props.exercises.filter(exercise => exercise.strengthOrCardio === "strength").map(strengthExercise => {
					return (
						<Row className="my-3" key={strengthExercise._id}>
							<ExerciseList workouts={props.workouts} setWorkouts={props.setWorkouts} selected={selected} setSelected={setSelected} exercises={props.exercises} setExercises={props.setExercises} exercise={strengthExercise} />
						</Row>
					);
				})}
			</Col>
			<Col className="cat mb-3">
				<h5 className="text-center mb-0">Cardio</h5>
				{props.exercises.filter(exercise => exercise.strengthOrCardio === "cardio").map(cardioExercise => {
					return (
						<Row className="my-3" key={cardioExercise._id}>
							<ExerciseList workouts={props.workouts} setWorkouts={props.setWorkouts} selected={selected} setSelected={setSelected} exercises={props.exercises} setExercises={props.setExercises} exercise={cardioExercise} />
						</Row>
					);
				})}
			</Col>
		</Row>
	</Container>
	: <h2 className="welcome m-5 text-center">Welcome! Get started by using the <span className="title">Forge</span>.</h2>}
			
			<Jumbotron fluid={true}>
				<Row className="mt-4">
					<Col xs="12" className="text-center my-2">
						<Button className="shadow-none" size="lg" color="secondary" outline onClick={toggleModal}>
							Forge
						</Button>
					</Col>
					<Col className="text-center my-2" hidden={(props.exercises.length) ? false : true}>
						<Link to="/execute">
							<Button className="shadow-none" size="lg" color="secondary" outline >
								Execute
							</Button>
						</Link>
					</Col>
					<Modal isOpen={isModalOpen} toggle={toggleModal}>
						<ModalHeader toggle={toggleModal}>
							<h4 className="title">Forge Menu</h4>
						</ModalHeader>
						<ModalBody className="text-center">
							<Form onSubmit={e => handleSubmit(e)} autoComplete="off">
								<Container form fluid={true}>
									<Row>
										<Col>
											<FormGroup>
												<Label className="mt-3 mb-2 title" htmlFor="exerciseName">Name Your Exercise:</Label>
												<Input type="text" name="exerciseName" id="exerciseName" required />
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormGroup>
												<Label htmlFor="exerciseType" className="mt-3 mb-2 title">Assign Type:</Label>
												<Input type="button" value="strength" className="mb-2" id="strengthExercise"
													name="exerciseType" onFocus={e => { e.target.checked = true; e.target.form[2].checked = false }} />
												<span>or</span>
												<Input type="button" value="cardio" className="mt-2" id="cardioExercise"
													name="exerciseType" onFocus={e => { e.target.checked = true; e.target.form[1].checked = false; }} />
											</FormGroup>
											<Button type="submit" className="mt-5 mb-3 shadow-none" size="lg" color="secondary" outline>
												Finish
											</Button>
										</Col>
									</Row>
								</Container>
							</Form>
							{(isLoading) ? loading : null}
						</ModalBody>
					</Modal>
				</Row>
			</Jumbotron>
		</>
	);
}