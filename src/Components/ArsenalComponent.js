import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Col, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import ExerciseList from './ExerciseListComponent';

export default function Arsenal(props) {

	const [isModalOpen, modalSwitch] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (!props.isLoggedIn) {
				loginRedirect();
			}
		}, 2000);
	});

	const forceClick = useRef();

	function loginRedirect() {
		forceClick.current.click();
	}

	function toggleModal() {
		modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const eName = e.target[0].value;
		const eType = e.target[1].checked ?
			e.target[1].value :
			e.target[2].checked ?
				e.target[2].value : alert('All new exercises must have an assigned Type.');
		props.setExerciseData(() => [{
			id: props.exerciseArr.length.toString(),
			eName,
			eType
		}, ...props.exerciseArr]);
		toggleModal();
	}

	function parseType(strength, cardio) {
		return strength ? strength : cardio ? cardio : null;
	}

	const sArray = parseType(props.exerciseArr.filter(exercises => exercises.eType === "Strength"), null);
	const cArray = parseType(null, props.exerciseArr.filter(exercises => exercises.eType === "Cardio"));

	return (
		<>
			<Link to="/login" ref={forceClick} replace hidden />
			<Container fluid={true} className="grid">
				<Row className="mt-1 mx-sm-2">
					<Col className="text-center cat">
						<h5>Your Workouts</h5>
					</Col>
				</Row>
				<Row>
					<Col className="text-center my-auto mb-2">
						~~Workouts Here~~
					</Col>
				</Row>
				<hr />
				<Row className="mt-1 mx-sm-2">
					<Col className="text-center cat">
						<h5>Your Exercises</h5>
					</Col>
				</Row>
				<Row>
					<Col className="cat mb-3">
						<h5 className="text-center mb-0">Strength</h5>
						{sArray.map(exercise => {
							return (
								<Row className="my-2" key={exercise.id}>
									<ExerciseList exercise={exercise} />
								</Row>
							);
						})}
					</Col>
					<Col className="cat mb-3">
						<h5 className="text-center mb-0">Cardio</h5>
						{cArray.map(exercise => {
							return (
								<Row className="my-2" key={exercise.id}>
									<ExerciseList exercise={exercise} />
								</Row>
							);
						})}
					</Col>
				</Row>
			</Container>
			<Jumbotron fluid={true}>
				<Row className="mt-4">
					<Col xs="12" className="text-center my-2">
						<Button className="shadow-none" size="lg" color="secondary" outline onClick={toggleModal}>
							Forge
						</Button>
					</Col>
					<Col className="text-center my-2">
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
												<Input type="button" value="Strength" className="mb-2" id="strengthExercise"
													name="exerciseType" onFocus={e => { e.target.checked = true; e.target.form[2].checked = false }} />
												<span>or</span>
												<Input type="button" value="Cardio" className="mt-2" id="cardioExercise"
													name="exerciseType" onFocus={e => { e.target.checked = true; e.target.form[1].checked = false; }} />
											</FormGroup>
											<Button type="submit" className="mt-5 mb-3 shadow-none" size="lg" color="secondary" outline>
												Finish
											</Button>
										</Col>
									</Row>
								</Container>
							</Form>
						</ModalBody>
					</Modal>
				</Row>
			</Jumbotron>
		</>
	);
}