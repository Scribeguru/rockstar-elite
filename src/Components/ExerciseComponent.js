import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

export default function Exercise({exercise}) {

    const [selectState, setSelect] = useState(false)

    function toggleSelect() {
        return setSelect(!selectState);
    } 

    return(
        <Row className="my-1" key={exercise.id}>
            <Col sm="1" className="exercise-option">
                <i className="fa fa-trash fa-sm" />
            </Col>
            <Col 
                className={`${selectState ? 'exercise-selected' : 'exercise-name'} text-center`}
                onClick={toggleSelect}
            >
                {exercise.eName} {selectState ? <span className="ml-1"><em>(selected)</em></span> : null}
            </Col>
            <Col sm="1" className="exercise-option">
                <i className="fa fa-pencil" />
            </Col>
        </Row>
    );
}