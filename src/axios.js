// axios
import axios from 'axios'
import apiConfig from '@/config/api.js'

export default axios.create({
	baseURL: apiConfig.baseURL,
	paramsSerializer(params) {
		let paramsStr = "";

		for (const key in params) {
			if (paramsStr != "")
				paramsStr += "&";

			paramsStr += (`${key  }=${  encodeURIComponent(params[key])}`);
		}

		return paramsStr;
	}
})

