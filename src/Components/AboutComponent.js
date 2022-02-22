import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from 'react-router-dom';

export default function About() {
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<h4>
						<span className="title">Rockstar Elite</span> is a personal workout assembling application. You can create cardio and strength exercises in <span className="title">Arsenal</span>, then use the <span className="title">Execute</span> page to keep track of your numbers during the workout. You can also save a cluster of exercises as a workout to make them easier to access, and archive your day's work to reflect on the progress you make over time.<br /><br /><span className="title">Thanks for using Rockstar Elite!</span>
					</h4>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="text-center" hidden={(JSON.parse(localStorage.getItem('selected-exercises'))) ? false : true} >
					<Link to="/execute">
						<Button className="shadow-none" size="lg" color="secondary" outline>
							Execute
						</Button>
					</Link>
				</Col>
				<Col className="text-center">
					<Link to="/">
						<Button className="shadow-none" size="lg" color="secondary" outline>
							Arsenal
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
}
