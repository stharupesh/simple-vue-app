import Vue from 'vue'

export default {
	setInputValue(state, data) {
		Vue.set(state.loginFormInputs, data.name, data.value);
	},
}
