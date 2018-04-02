import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Button } from 'react-bootstrap';
import API from '../utils/API';

class ClubContainer extends Component {
	state = {
		clubinfo: [],
	};
  
	componentDidMount() {
		this.fetchClubInfo(this.props.match.params.id);
	}

	fetchClubInfo = (id) => {
		API.findGroups(id)
		.then(groups=>{
			this.setState({clubinfo: groups.data});
			console.log('Showing state after finding groups:',this.state);
		});
	}

	// handleViewClick = id => {
	// 	console.log('Clicked - view club: ',id);
	// 	this.props.history.replace(`/clubs/${id}`);
	// }

	render() {
		const { clubinfo } = this.state;
		return (
			<Grid fluid={true}>
				<Grid fluid={false}>
					<Row className="show-grid">
						<Col xs={12}>
							<h1>{clubinfo.groupname}</h1>
							<p>{clubinfo.description}</p>
							<p>Debug: GroupID - {this.props.match.params.id}</p>
						</Col>
					</Row>
					<Row className="show-grid">
						<Col xs={12}><h2>Club Members</h2></Col>
					</Row>
					<Row className="show-grid">
						{this.state.clubinfo.member ? (
							<div>
								{this.state.clubinfo.member.map(mem=>(
									<Col xs={12} md={6} lg={4} key={mem._id}>
										<h3>{mem.username}</h3>
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

export default ClubContainer;
