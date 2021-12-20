import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import SelectedList from './SelectedListComponent';

export default function Execute(props) {

    const [selectArr, setList] = useState(props.exerciseArr.filter(exercise => exercise.selected));
    const [dragging, setdragging] = useState(false);
    
    const dragExercise = useRef();
    const dragTarget = useRef();
    const dragNode = useRef();

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
                onDragStart={(e) => {handleDragStart(e, eIndex)}}
                onDragEnter={dragging ? (e) => handleDragEnter(eIndex) : null}
                onDragOver={dragging ? (e) => handleDragOver(e) : null}
                onDrop={() => {handleDrop()}}
            >
                <SelectedList exercise={exercise} />
            </Col>
        </Row>
    )); 
    //I need to package this data to be shipped off to HeaderComponent and/or ArsenalComponent when the corresponding buttons get pressed.
    //When that happens, selectArr needs to be completely cleaned out.
    return(
        <>
            <Container fluid className="grid">
               {mappedSelect}
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
                        <Link to="/">
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