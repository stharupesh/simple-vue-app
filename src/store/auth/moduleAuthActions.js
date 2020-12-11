import auth from '@/core/auth.js'
import apiConfig from '@/config/api.js'
import request from '@/core/request.js'

export default {
    fetchAndStoreProfileDetails() {
        return new Promise((resolve, reject) => {
            request.withAPI(apiConfig.profile.getDetails)

                .withToken()
                .send()
                .then(
                    response => {
                        auth.setLoggedInUser(response.data.data.user);

                        resolve(response);
                    },
                    error => {
                        reject(error.response);
                    }
                )
        })
    },

    logout() {
        return new Promise((resolve, reject) => {
            request.withAPI(apiConfig.auth.logout)

                .withToken()
                .send()
                .then(
                    response => {
                        auth.removeLoggedInUser();
                        auth.removeAuthToken();

                        resolve(response);
                    },
                    error => {
                        reject(error.response);
                    }
                )
        })
    },
}
