'use strict';

module.exports = function (ApiResource) {
    var PageResource = ApiResource('/page/:id', { id: '@id' }, {
    });

    return PageResource;
};
