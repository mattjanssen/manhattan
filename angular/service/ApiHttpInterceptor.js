'use strict';

module.exports = function ($injector, $q, $rootScope, API_URL) {
    /**
     * Use with $httpProvider.interceptors.push() to intercept all AJAX requests and responses
     * in order to add authentication headers and detect authentication issues.
     *
     * @link https://docs.angularjs.org/api/ng/service/$http
     */
    var service = {};

    service.request = request;
    service.responseError = responseError;

    return service;

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
        // @TODO Re-wire.
        if (true || config.allowAnonymous || authenticationService.isLoggedIn()) {
            // For API requests check to see we have credentials.
            var jwt = authenticationService.getJwt();

            // Authentication is already present. Continue with request.
            addJwtHeaderToConfig(config, jwt);

            return config;
        }

        // We're requesting an API endpoint without first being logged in. Either we can authenticate using
        // stored credentials, or we'll have to fail this request.
        return $q(function (resolve, reject) {
            authenticationService.reloadCredentials().then(function () {
                // For API requests check to see we have credentials.
                var jwt = authenticationService.getJwt();

                // The stored credentials were valid. Continue with request.
                addJwtHeaderToConfig(config, jwt);

                resolve(config);
            }).catch(function () {
                // The stored credentials were not valid. Fail the request.
                reject($q.reject());
            });
        });
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
            // The credentials used on the request were not valid. The JWT may have expired.
            // Attempt to reload credentials.
            return $q(function (resolve, reject) {
                // Avoid the circular dependency by run-time injection.
                var authenticationService = $injector.get('AuthenticationService');

                authenticationService.reloadCredentials().then(function () {
                    // Credentials reload was successful. Retry the request.
                    // @TODO Recreate the request promise.
                    debugger;
                }).catch(function () {
                    // Stored credentials were not valid. Fail the request.
                    debugger;
                    reject(rejection);
                });
            });
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
     * Attache Current JWT to Request Config
     *
     * Do NOT cache this JWT header or token as it may change during an asynchronous authentication request.
     *
     * @param config
     */
    function addJwtHeaderToConfig(config, jwt) {

        // Add the JWT to a modified HTTP Basic authentication header.
        // https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#2-use-the-token
        config.headers['Authorization'] = 'Bearer ' + jwt;
    }
};
