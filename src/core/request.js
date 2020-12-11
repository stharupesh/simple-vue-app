import axios from '@/axios.js'
import auth from '@/core/auth.js'

export default {
	headers: {},
	url: '',
	method: '',
	data: {},
	params: {},

	withToken() {
		this.headers['Authorization'] = this.getAuthHeader();
		return this;
	},

	getAuthHeader() {
		return `Bearer ${  auth.getAuthToken()}`;
	},

	withAPI(routeConfig) {
		this.url = routeConfig.url;
		this.method = routeConfig.method;

		return this;
	},

	withParams(params) {
		this.params = params;
		return this;
	},

	withData(data) {
		this.data = data;
		return this;
	},

	send() {
		const axiosConfig = {
			method: this.method,
			url: this.url,
			params: this.params,
			headers: this.headers,
			data: this.data
		};

		this.reset();

		return axios(axiosConfig);
	},

	reset() {
		this.headers = {};
		this.url = '';
		this.method = '';
		this.data = {};
		this.params = {};
	}
}
