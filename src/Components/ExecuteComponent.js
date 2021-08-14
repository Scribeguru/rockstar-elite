import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import SelectedList from './SelectedList';

export default function Execute(props) {

    const [selectArr, setList] = useState(props.exerciseArr.filter(exercise => exercise.selected))
    const [dragging, setdragging] = useState(false);

    const dragExercise = useRef();
    const dragNode = useRef();

    let newList = JSON.parse(JSON.stringify(selectArr));

    function moveItem(from, to) {
        const f = newList.splice(from, 1)[0];
        return newList.splice(to, 0, f);
    }

    function handleDragStart(e, eIndex) {
        console.log('drag starting..', eIndex);
        dragExercise.current = eIndex;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setdragging(true);
    }

    function handleDragEnter(e, eIndex) {
        setList(prevList => moveItem(prevList[dragExercise.current], eIndex));
    }

    function handleDragEnd(eIndex) {
        console.log('Ending drag..')
        setdragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragExercise.current = null;
        dragNode.current = null;
    }

    function getStyles(eIndex) {
        if (dragExercise.current === eIndex) {
            return 'current-drag selected';
        }
        return 'selected';
    }

    return(
        <>
            <Container fluid className="grid">
                {selectArr.map((exercise, eIndex) => (
                    <Row
                        xs="12"
                        className={`${dragging ? getStyles(eIndex) : 'selected'}`}
                        key={exercise.id}
                        draggable
                        onDragStart={(e) => {handleDragStart(e, eIndex)}}
                        onDragEnter={dragging ? (e) => handleDragEnter(e, eIndex) : null}
                    >
                        <Col>
                            <SelectedList exercise={exercise} />
                        </Col>
                    </Row>
                ))}
            </Container>
            <Jumbotron fluid>
                <Row className="mt-4">
                    <Col xs="12" className="text-center my-2">
                         <Button className="shadow-none text-nowrap" size="lg" color="secondary" outline>
                            Archive Log
                        </Button>
                    </Col>
                    <Col xs="12" className="text-center my-2">
                        <Button className="shadow-none" size="lg" color="secondary" outline>
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
        </>
    );
}