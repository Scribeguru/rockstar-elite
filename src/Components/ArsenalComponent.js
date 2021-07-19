import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Jumbotron, Container, Col, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Arsenal({exercises, addExercises}) {

    const [isModalOpen, modalSwitch] = useState(false);
    const [exerciseName, setExerciseName] = useState(null);
    const [exerciseType, setExerciseType] = useState(null);

    function toggleModal() {
        modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const nameInput = e.target[0];
        const sType = e.target[1];
        const cType = e.target[2];
        // if (sType.checked) {
        //     cType.checked = false;
        // }
        // if (cType.checked) {
        //     sType.checked = false;
        // this is supposed to be a switch to check and uncheck the exercise type form controls based on focus}
        console.log(nameInput.value, sType.checked, cType.checked);
    };

    return(
        <>
            <Container fluid={true} className="grid">
                <Row className="mt-1 mx-sm-2">
                    <Col className="text-center cat">
                        <h5>Your Workouts</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center my-auto mb-2">
                        It is in this space entire workouts will be saved
                    </Col>
                </Row>
                <hr />
                <Row className="mt-1 mx-sm-2">
                    <Col className="text-center cat">
                        <h5>Your Exercises</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="mx-sm-2 text-center cat">
                        <h5>Strength</h5>
                    </Col>

                    <Col className="mx-sm-2 text-center cat">
                        <h5>Cardio</h5>
                    </Col>
                </Row>
            </Container>
            <Jumbotron fluid={true}>
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button className="shadow-none" size="lg" color="secondary" outline onClick={toggleModal}>
                            Forge
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <NavLink to="/">
                            <Button className="shadow-none" size="lg" color="secondary" outline >
                                Execute
                            </Button>
                        </NavLink>
                    </Col>
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                            <h4 className="title">Forge Menu</h4>
                        </ModalHeader>
                        <ModalBody className="text-center">
                            <Form onSubmit={e => {handleSubmit(e)}} autoComplete="off">
                                <Container form fluid={true}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label className="mt-3 mb-2 title" htmlFor="exerciseName">Name Your Exercise:</Label>
                                                <Input type="text" className="form-control" name="exerciseName" id="exerciseName" required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="exerciseTypes" className="mt-3 mb-2 title">Assign Type:</Label>
                                                <Label htmlFor="strengthExercise" hidden />
                                                <Input type="button" value="Strength" className="form-control mb-2" id="strengthExercise" name="strengthExercise" onFocus={e => {e.target.checked = true}} />
                                                <span>or</span>
                                                <Label htmlFor="cardioExercise" hidden />
                                                <Input type="button" value="Cardio" className="form-control mt-2" id="cardioExercise" 
                                                name="cardioExercise" onFocus={e => {e.target.checked = true}} />
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