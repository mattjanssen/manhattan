'use strict';

// Initialize the app and its dependencies. (See dependency includes below)
require('angular').module('app', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router'
])
    .config(function (
        $httpProvider,
        $interpolateProvider,
        $locationProvider,
        $stateProvider,
        $urlRouterProvider
    ) {
        // Do not use hash (#) before AngularJS routes and parameters.
        $locationProvider.html5Mode(true);

        // Intercept all $http communications to handle API authorization and responses.
        $httpProvider.interceptors.push('ApiHttpInterceptor');

        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        // Setup route to handle any Single Page App pages.
        $stateProvider
            .state('home', {
                url: '/',
                template: '<home></home>'
            })
            .state('create', {
                url: '/create',
                template: '<create></create>'
            })
            .state('404', {
                templateUrl: 'view/404.html'
            });
    })
    .run(function (
        $rootScope,
        $state,
        AuthenticationService
    ) {
        $rootScope.$on('authentication.logout', handleLogout);

        $rootScope.$on('$stateChangeStart', watchPageChange);

        function handleLogout() {
            $state.go('home');
        };

        // Enforce route access based on authentication status.
        function watchPageChange(event, toState, toParams, fromState, fromParams) {
            if (fromState.abstract) {
                // The initial page can happen before auth. Don't force a redirect until auth in complete.
                return;
            }

            if (!AuthenticationService.isLoggedIn() && toState.name !== 'home') {
                // User tried to navigate to page that requires auth before logging in.
                event.preventDefault();
                handleLogout();
            }
        }
    })
;

// Some non-require libraries need access to these assumed globals.
global.jQuery = global.$ = require('jquery');
global.moment = require('moment');

// Require dependencies.
require('angular');
require('angular-animate');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('bootstrap');
require('jquery-ui');
require('lodash');

// Load environment-specific constants.
require('./Environment');

// Load all source files.
require('./component');
require('./directive');
require('./filter');
require('./resource');
require('./service');
