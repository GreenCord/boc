import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Unauth = props => (
	<Grid fluid={true}>
		<Grid fluid={false}>
			<Row className="show-grid text-center">
				<Col xs={12}>
					<h1>Welcome to Base of Clubs</h1>
				</Col>
			</Row>
		</Grid>
		<Grid fluid={false}>
			<Row className="show-grid text-center">
				<Col xs={12} sm={6} md={4}>
					<h2>Sign up</h2>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<h2>Create a Club</h2>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<h2>Do Stuff</h2>
				</Col>
			</Row>
		</Grid>
	</Grid>
);

export default Unauth;