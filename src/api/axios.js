const axios = require('axios');
const instance = axios.create({
    baseURL: process.env.VUE_APP_APP_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    get: function(endpoint, success_callback, error_callback, params = {}) {
        instance.get(endpoint, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                error_callback(error.status, error.data);
            });
    },
    post: function(endpoint, data, on_success, on_error, params = {}) {
        instance.post(endpoint, data, { params: params })
            .then(function(response) {
                on_success(response.data);
            })
            .catch(function(error) {
                on_error(error.status, error.data);
            });
    },
    put: function(endpoint, data, success_callback, error_callback, params = {}) {
        instance.put(endpoint, data, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                error_callback(error.status, error.data);
            });
    },
    del: function(endpoint, success_callback, error_callback) {
        instance.put(endpoint)
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                error_callback(error.status, error.data);
            });
    }
}