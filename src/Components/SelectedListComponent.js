import React from 'react';
import { Row, Col, Input } from 'reactstrap';

export default function SelectedList({exercise}) {

    function parseType() {
        const strength = 
        <Row className="text-center">
            <Col>
                <Input placeholder="sets" />
            </Col>
            <Col>
                <Input placeholder="reps" />
            </Col>
            <Col>
                <Input placeholder="weight" />
            </Col>
        </Row>;
        const cardio = <Input placeholder="length" />
        const type = (exercise.eType === "Strength") ? strength : cardio;
        return type;
    }

    return(
        <>
            <em>{exercise.eName}</em>
            {parseType()}
        </>
    );
}