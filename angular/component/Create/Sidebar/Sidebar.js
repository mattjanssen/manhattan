'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/sidebar.html',
    bindings: {
        pages: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.pages;
    }
};
