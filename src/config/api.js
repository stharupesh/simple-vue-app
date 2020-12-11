/**
 * api config
 * @type {String}
 */

const domain = process.env.VUE_APP_DOMAIN;
const baseURL = `${domain}api/`;

export default {
    domain,
    baseURL,

    CODES: {
        HTTP_OK: 200,
        HTTP_TOO_MANY_REQUESTS: 429,
        HTTP_UNAUTHORIZED: 401,
        HTTP_INTERNAL_SERVER_ERROR: 500,
        HTTP_CONFLICT: 409,
        HTTP_UNPROCESSABLE_ENTITY: 422,
        HTTP_NOT_FOUND: 404
    },

    auth: {
        login: {
            url: `${baseURL}login`,
            method: 'POST'
        },
        logout: {
            url: `${baseURL}logout`,
            method: 'GET'
        }
    },
    profile: {
        getDetails: {
            url: `${baseURL}profile/get-details`,
            method: 'GET'
        }
    },
    car: {
        inStock: {
            url: `${baseURL}car/in-stock`,
            method: 'POST'
        }
    }
}
