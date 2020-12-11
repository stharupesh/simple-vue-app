export default {
	storageKeyForToken: 'auth-token',
	storageKeyForUser: 'auth-user',

	constructor() {

	},

	isLoggedIn() {
		return (this.getAuthToken() != null);
	},

	setAuthToken(token) {
		localStorage.setItem(this.storageKeyForToken, token);
	},

	getAuthToken() {
		return localStorage.getItem(this.storageKeyForToken);
	},

	setLoggedInUser(user) {
		localStorage.setItem(this.storageKeyForUser, JSON.stringify(user));
	},

	removeAuthToken() {
		localStorage.removeItem(this.storageKeyForToken);
	},

	removeLoggedInUser() {
		localStorage.removeItem(this.storageKeyForUser);
	},

	hasLoggedInUser() {
		return (this.getLoggedInUser() != null);
	},

	getLoggedInUser() {
		return JSON.parse(localStorage.getItem(this.storageKeyForUser));
	},

	logout() {
		// call API to invalidate token then

		this.removeLoggedInUser();
		this.removeAuthToken();
	},
}