import axios from 'axios';

// const KEY = process.env.REACT_APP_APPKEY;

export default {

	findUser: function(id) {
		// console.log('RA|/utils/API: Axios finding user. id:',id);
		return axios({
			method: 'get',
			url: '/api/user/find/'+id
		});
	},

	createUser: function(data) {
		// console.log('RA|/utils/API: Axios creating user with data:',data);
		return axios({
			method: 'post',
			url: '/api/user/create',
			data: data
		});
	},

	updateUser: function(data) {
		console.log('RA|/utils/API: Axios updating user with data:',data);
		return axios({
			method: 'post',
			url: '/api/user/update/'+data.id,
			data: {lastlogin_at: data.lastlogin_at}
		});
	},

	createGroup: function(data) {
		// console.log('RA|/utils/API: Axios creating a group with data:',data);
		return axios({
			method: 'post',
			url: '/api/group/create',
			data: data
		});
	},

	joinGroup: function(id,uid) {
		// console.log('RA|/utils/API: Axios adding member ' + uid + ' to group ' + id);
		return axios({
			method: 'post',
			url: '/api/group/update/'+id+'/'+uid,
		});
	},

	findGroups: function(id) {
		// console.log('RA|/utils/API: Axios finding group(s).',id);
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
	},

	findGroupByUser: function(uid) {
		// console.log('RA|/utils/API: Axios finding groups by UID',uid);
		return axios({
			method: 'get',
			url: '/api/group/find/user/'+uid
		})
	},

	createPost: function(data) {
		console.log('RA|/utils/API: Axios creating post with',data);
		return axios({
			method: 'post',
			url: '/api/post/create',
			data: data
		});
	},

	findPosts: function(id) {
		console.log('RA|/utils/API: Axios finding posts in group',id);
		if (!id) {
			return;
		} else {
			return axios({
				method: 'get',
				url: '/api/post/find/'+id
			});
		}
	}

}