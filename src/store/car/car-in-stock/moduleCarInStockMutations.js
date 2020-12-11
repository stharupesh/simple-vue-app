import Vue from 'vue'

export default {
	setCarsInStock(state, data) {
		Vue.set(state, 'carsInStock', data );
	},
	setPaginationData(state, data) {
		Vue.set(state, 'pagination', data );
	},
	setSearchValue(state, data) {
		Vue.set(state.filters, 'search', data);
	}
}
