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

        // Not sure?
        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        // Transform API responses.
        $httpProvider.interceptors.push('ApiResponseInterceptor');

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
        $http,
        $rootScope,
        $state
    ) {
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
