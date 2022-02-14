import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Collapse } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import Archive from './ArchiveComponent';

export default function Header(props) {

	const [isCollapsed, setCollapsed] = useState(false);

	useEffect(() => {
		lastMeasured();
	}, [props.userWeight]);

	function toggleCollapse() {
		setCollapsed(isCollapsed => isCollapsed = !isCollapsed);
	}

	function currentDate() {
		let today = new Date();
		let month = today.getMonth();
		let day = today.getDate();
		let year = today.getFullYear();
		return `${month + 1}/${day}/${year}`;
	}

	function lastMeasured() {
		let mostRecent = new Date(props.userWeight.lastMeasured);

		let month = mostRecent.getMonth();
		let day = mostRecent.getDate();
		let year = mostRecent.getFullYear();
		if (day) {
			return `${month + 1}/${day}/${year}`;
		} else {
			return "--"
		}
	}

	function logout() {
		fetch(baseUrl + 'api/users/logout', {
			credentials: 'include',
		});
	}

	return (
		<Jumbotron fluid>
			<Container className="mb-4">
				<Row className="pt-2 pb-3 title">
					<Col sm="3" className="text-center">
						<h4 hidden={(props.isLoggedIn) ? false : true}>{currentDate()}</h4>
					</Col>
					<Col xs="order-first text-center" sm="6">
						<h1 className="title"><em><u>Rockstar Elite</u></em></h1>
					</Col>
					<Col sm="3" className="text-center">
						<h4
							hidden={(props.isLoggedIn) ? false : true}>
							Weight: {props.userWeight.weight || "--"} {(props.userWeight.systemIsMetric) ? 'kgs' : 'lbs'}<br />as of<br />{lastMeasured()}
						</h4>
					</Col>
				</Row>
				<Row hidden={(props.isLoggedIn) ? false : true}>
					<Col className="text-center">
						<h5><span className="links" onClick={toggleCollapse}>Archive</span></h5>
					</Col>
					<Col className="text-center">
						<h5><Link to="/about" className="links">About</Link></h5>
					</Col>
					<Col className="text-center">
						<h5 onClick={logout}>
							<Link to="/login" className="links">Logout</Link>
						</h5>
					</Col>
					<Collapse isOpen={isCollapsed}>
						{(props.archive.length) ? props.archive.map(log => {
							return (
								<>
									<Row key={log._id} className="mb-3">
										<Archive log={log} archive={props.archive} setArchive={props.setArchive} />
									</Row>
									<hr />
								</>
							);
						}) : <div>Archive your first log by using the <span className="title">Archive Log</span> button in <span className="title">Execute</span>.</div>}
					</Collapse>
				</Row>
			</Container>
		</Jumbotron>
	);
}