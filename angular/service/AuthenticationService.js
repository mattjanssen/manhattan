'use strict';

module.exports = function ($http, $location, $q, $rootScope, API_URL) {
    var AuthenticationService = {};

    var API_KEY_STORAGE_KEY = 'k';
    var API_KEY_URL_PARAM = 'key';
    var LOGIN_URL = '/login/google';

    var storage = localStorage;
    var key = null;

    loadCredentials();

    AuthenticationService.getKey = getKey;
    AuthenticationService.isLoggedIn = isLoggedIn;
    AuthenticationService.login = login;
    AuthenticationService.logout = logout;

    // Register this function globally to use in templates.
    // Inside components, access it using $root.isLoggedIn().
    $rootScope.isLoggedIn = isLoggedIn;

    return AuthenticationService;

    /**
     * Check the URL Parameters or LocalStorage for an API Key
     *
     * @return Promise
     */
    function loadCredentials() {
        key = $location.search()[API_KEY_URL_PARAM];

        if (key) {
            // Save the API key from the URL in storage.
            storage.setItem(API_KEY_STORAGE_KEY, key);

            // Remove the key from the URL and browser history.
            $location.search(API_KEY_URL_PARAM, null);
            $location.replace();
        } else {
            // Try to get the key from storage.
            key = storage.getItem(API_KEY_STORAGE_KEY);
        }

        if (!key) {
            // Credentials are missing. Enforce a logged-out state.
            return $q.reject();
        }
    }

    /**
     * Get the User's API Key
     *
     * @return string
     */
    function getKey() {
        return key;
    }

    /**
     * Check if Logged In
     *
     * @return boolean
     */
    function isLoggedIn() {
        return !!key;
    };

    /**
     * Redirect User to Google OAuth Process
     */
    function login() {
        $http.get(API_URL + LOGIN_URL).then(function (success) {
            window.location = success.data.data;
        });
    };

    /**
     * Clear Credentials and Trigger Logout if Logged In
     */
    function logout() {
        storage.removeItem(API_KEY_STORAGE_KEY);
        key = null;

        $rootScope.$emit('authentication.logout');
    };
};
