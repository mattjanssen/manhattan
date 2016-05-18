'use strict';

module.exports = function ($injector, $q, $rootScope, API_URL) {
    /**
     * Use with $httpProvider.interceptors.push() to intercept all AJAX requests and responses
     * in order to add authentication headers and detect authentication issues.
     *
     * @link https://docs.angularjs.org/api/ng/service/$http
     */
    var ApiHttpInterceptor = {};

    ApiHttpInterceptor.request = request;
    ApiHttpInterceptor.responseError = responseError;

    return ApiHttpInterceptor;

    /**
     * Intercept Requests
     *
     * @param HttpConfig config
     * @return Promise<HttpConfig>
     */
    function request(config) {
        if (!config.apiRequest) {
            // Not an API request. Do not alter. This flag is set by the ApiResourceFactory.
            return config;
        }

        // For API requests append the API URL.
        config.url = API_URL + config.url;

        // Avoid the circular dependency by run-time injection.
        var authenticationService = $injector.get('AuthenticationService');

        // Either the user must be authenticated, or the endpoint must allow anonymous use.
        if (!config.allowAnonymous && !authenticationService.isLoggedIn()) {
            // We're requesting an API endpoint without first being logged in.
            return $q.reject({
                status: 401,
                config: config
            });
        }

        // For API requests check to see we have credentials.
        var key = authenticationService.getKey();

        // Authentication is already present. Continue with request.
        addKeyHeaderToConfig(config, key);

        return config;
    };

    /**
     * Handle API HTTP Errors
     *
     * @param HttpRejection rejection
     * @return Promise<HttpRejection|Request>
     */
    function responseError(rejection) {
        if (!rejection.config || !rejection.config.apiRequest) {
            // Not an API request. Do not process. This flag is set by the ApiResourceFactory.
            return rejection;
        }

        if (rejection.status === 401) {
            // Avoid the circular dependency by run-time injection.
            var authenticationService = $injector.get('AuthenticationService');

            // User is not authenticated. Force logout.
            authenticationService.logout();

            return rejection;
        }

        if (rejection.status === 500) {
            var error = _.get(rejection, 'data.error');

            if (error) {
                alert('Server API error: ' + error.title);
            } else {
                alert('Server 500 error: ' + rejection.statusText);
            }
        }

        return rejection;
    }

    /**
     * Attache Current API Key to Request Config
     *
     * @param config
     */
    function addKeyHeaderToConfig(config, key) {

        // Add the API Key to a modified HTTP Basic authentication header.
        config.headers['Authorization'] = 'Bearer ' + key;
    }
};
