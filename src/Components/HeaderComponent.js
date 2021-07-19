import { NavLink } from 'react-router-dom';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

export default function Header() {
    return(
        <Jumbotron fluid>
            <Container className="mb-4">
                <Row className="pt-2">
                     <Col sm="3" className="text-center">
                        <h4>MM/DD/YYYY</h4>
                    </Col>
                     <Col xs="order-first text-center" sm="6">
                        <h1><NavLink to="/" className="links title">Rockstar Elite</NavLink></h1>
                    </Col>
                    <Col sm="3" className="text-center">
                        <h4>Last Weigh-in</h4>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <h5>Archive</h5>
                    </Col>
                    <Col className="text-center">
                            <h5><NavLink to="/about" className="links">About</NavLink></h5>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}