'use strict';

require('angular').module('app')
    .factory('ApiHttpInterceptor', require('./ApiHttpInterceptor'))
    .factory('ApiResource', require('./ApiResource'))
    .factory('AuthenticationService', require('./AuthenticationService'))
;
