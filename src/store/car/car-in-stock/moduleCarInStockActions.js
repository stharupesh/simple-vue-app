import apiConfig from '@/config/api.js'
import request from '@/core/request.js'

export default {
	fetchCarsInStock({ commit }, filters) {
		return new Promise((resolve, reject) => {
			request.withAPI(apiConfig.car.inStock)

				.withToken()
				.withData(filters)
				.send()
				.then(
					response => {
						commit('setCarsInStock', response.data.data.cars.items)
						commit('setPaginationData', response.data.data.cars.pagination)
						resolve(response);
					},
					error => {
						reject(error.response);
					}
				)
		})
	}
}
