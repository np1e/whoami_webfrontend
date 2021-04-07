const axios = require('axios');
const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
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
                console.log(error.message);
                if(error.message == "Network Error") {
                    error_callback("NETWORK", error)
                } else {
                    error_callback(error.code, error.data);
                }
            });
    },
    post: function(endpoint, data, success_callback, error_callback, params = {}) {
        instance.post(endpoint, data, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                if(error.message == "NetworkError") {
                    error_callback("NETWORK", error)
                } else {
                    error_callback(error.code, error.data);
                }
            });
    },
    put: function(endpoint, data, success_callback, error_callback, params = {}) {
        instance.put(endpoint, data, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                if(error.message == "NetworkError") {
                    error_callback("NETWORK", error)
                } else {
                    error_callback(error.code, error.data);
                }
            });
    },
    del: function(endpoint, success_callback, error_callback) {
        instance.put(endpoint)
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                if(error.message == "NetworkError") {
                    error_callback("NETWORK", error)
                } else {
                    error_callback(error.code, error.data);
                }
            });
    }
}