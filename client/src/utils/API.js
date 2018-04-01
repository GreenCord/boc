import axios from 'axios';

const KEY = process.env.REACT_APP_APPKEY;

export default {

	findUser: function(id) {
		console.log('RA|/utils/API: Axios finding user. id:',id);
		return axios({
			method: 'get',
			url: '/api/user/find/'+id
		});
	},

	createUser: function(data) {
		console.log('RA|/utils/API: Axios creating user with data:',data);
		return axios({
			method: 'post',
			url: '/api/user/create',
			data: data
		});
	},

	createGroup: function(data) {
		console.log('RA|/utils/API: Axios creating a group with data:',data);
		return axios({
			method: 'post',
			url: '/api/group/create',
			data: data
		});
	},

	findGroups: function(id) {
		console.log('RA|/utils/API: Axois finding group(s).',id);
		// if no id, find all groups
		if (!id) {
			return axios({
				method: 'get',
				url: '/api/group/find'
			});
		} else {
			return axios({
				method: 'get',
				url: '/api/group/find/'+id
			});
		}
	}

}