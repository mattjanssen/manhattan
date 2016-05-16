'use strict';

module.exports = function () {
    var ApiResponseInterceptor = {
        'response': function (response) {
            if (response.data.data) {
                response.data = response.data.data;
            }

            return response;
        }
    };

    return ApiResponseInterceptor;
};
