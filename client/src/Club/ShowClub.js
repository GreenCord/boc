import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Button } from 'react-bootstrap';
import API from '../utils/API';

class ShowClub extends Component {
	state = {
		groups: [],
		loadmsg: 'Loading groups...'
	};
  
	componentDidMount() {
		this.loadGroups();
	}

	loadGroups = (id) => {
		API.findGroups(id)
		.then(groups=>{
			this.setState({groups: groups.data, loadmsg: 'No groups found.'});
			console.log('Showing state after finding groups:',this.state);
		});
	}

	handleViewClick = id => {
		console.log('Clicked - view club: ',id);
		this.props.history.replace(`/clubs/${id}`);
	}

	render() {
		return (
			<Grid fluid={true}>
				<Grid fluid={false}>
					<Row className="show-grid">
						<Col xs={12}>
							<h1>List of Clubs</h1>
						</Col>
					</Row>
					<Row className="show-grid">
						{this.state.groups.length ? (
							<div>
								{this.state.groups.map(group=>(
									<Col xs={12} md={6} lg={4} key={group._id}>
										<ListGroup>
												<ListGroupItem header={group.groupname}>
													{/*<h2>{group.groupname}</h2>*/}
													{group.description}<br />
													Members: {group.member.length}
												</ListGroupItem>
												<ListGroupItem>
													<Button className="btn btn-primary" onClick={() => this.handleViewClick(group._id)}>View Club</Button>
												</ListGroupItem>
										</ListGroup>
									</Col>
								))}
							</div>
						) : (
							<Col xs={12}>
								<h2>{this.state.loadmsg}</h2>
							</Col>
						)}
					</Row>
				</Grid>
			</Grid>
		)
	};
}

export default ShowClub;
