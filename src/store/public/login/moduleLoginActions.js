import apiConfig from '@/config/api.js'
import request from '@/core/request.js'

export default {
	userLogin({ commit, state }) {
		return new Promise((resolve, reject) => {
			request.withAPI(apiConfig.auth.login)

				.withData(state.loginFormInputs)
				.send()
				.then(
					response => {
						resolve(response);
					},
					error => {
						reject(error.response);
					}
				)
		})
	}
}
