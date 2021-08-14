import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from 'react-router-dom';

export default function About() {
    return(
        <Container>
            <Row>
                <Col className="text-center">
                    Rockstar Elite is a personal workout assembling application. You can create, edit, store, and delete your exercises and workouts, as well as track your weight over time.
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <Link to="/">
                        <Button className="shadow-none" size="lg" color="secondary" outline>
                            Execute
                        </Button>
                    </Link>
                </Col>
                <Col className="text-center">
                    <Link to="/arsenal">
                        <Button className="shadow-none" size="lg" color="secondary" outline>
                            Arsenal
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
