import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import API from '../utils/API';

class ShowClub extends Component {
	state = {
		groups: []
	};

	componentDidMount() {
		this.loadGroups();
	}

	loadGroups = (id) => {
		API.findGroups(id)
		.then(groups=>{
			this.setState({groups: groups.data});
			console.log('Showing state after finding groups:',this.state);
		});
	}

	render() {
		return (
			<div>
				<h1>List of Clubs</h1>
				{this.state.groups.length ? (
					<ListGroup>
						{this.state.groups.map(group=>(
							<ListGroupItem key={group._id}>
								<h2>{group.groupname}</h2>
								<p>{group.description}</p>
								<p>Members: {group.member.length}</p>
							</ListGroupItem>
						))}
					</ListGroup>
				) : (
					<h2>Looking for groups...</h2>
				)}
			</div>
		)
	};
}

export default ShowClub;
