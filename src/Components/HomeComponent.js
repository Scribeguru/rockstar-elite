import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';

export default function Home() {
    return(
        <>
            <Container fluid={true} className="grid">
                <Row className="mt-1">
                    <Col className="mx-sm-1 text-center cat">
                        <h5>Name</h5>
                    </Col>
                    <Col className="mx-sm-1 text-center cat">
                        <h5>Details</h5>
                    </Col>
                    <Col className="mx-sm-1 text-center cat">
                        <h5>Intensity</h5>
                    </Col>
                </Row>
                <Row>
                    <Col draggable={true}>
                        exercise renders here
                    </Col>
                </Row>
            </Container>
            <Jumbotron fluid={true}>
                <Row className="mt-4">
                    <Col className="title">
                         <Button className="shadow-none text-nowrap" size="lg" color="secondary" outline>
                            Archive Log
                        </Button>
                    </Col>
                    <Col className="text-center">
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