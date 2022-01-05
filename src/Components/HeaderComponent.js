import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function Header(props) {

	function currentDate() {
		let today = new Date();
		let month = today.getMonth();
		let day = today.getDate();
		let year = today.getFullYear();
		return `${month + 1}/${day}/${year}`;
	}

	function logout() {
		fetch(baseUrl + 'users/logout', {
			credentials: 'include',
		});
	}

	return (
		<Jumbotron fluid>
			<Container className="mb-4">
				<Row className="pt-2">
					<Col sm="3" className="text-center">
						<h4 hidden={(props.isLoggedIn) ? false : true}>{currentDate()}</h4>
					</Col>
					<Col xs="order-first text-center" sm="6">
						<h1 className="title">Rockstar Elite</h1>
					</Col>
					<Col sm="3" className="text-center">
						<h4 hidden={(props.isLoggedIn) ? false : true}>Last Weigh-in:</h4>
					</Col>
				</Row>
				<Row hidden={(props.isLoggedIn) ? false : true}>
					<Col className="text-center">
						<h5><Link className="links">Archive</Link></h5>
					</Col>
					<Col className="text-center">
						<h5><Link to="/about" className="links">About</Link></h5>
					</Col>
					<Col className="text-center">
						<h5 onClick={logout}>
							<Link to="/login" className="links">Logout</Link>
						</h5>
					</Col>
				</Row>
			</Container>
		</Jumbotron>
	);
}