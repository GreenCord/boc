import axios from 'axios';

const KEY = process.env.REACT_APP_APPKEY;

export default {

	findUser: function(id) {
		console.log('RA|/utils/API: Axios finding user. id:',id);
		return axios({
			method: 'get',
			url: '/api/user/find/'+id
		});
	}

}