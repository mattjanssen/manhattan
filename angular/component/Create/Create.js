'use strict';

module.exports = {
    templateUrl: 'view/create/create.html',
    controller: function($timeout, PageResource) {
        var viewModel = this;

        viewModel.pages = null;

        viewModel.isInitd = isInitd;

        // Populate the existing templates list.
        PageResource.query().$promise.then(function (success) {
            viewModel.pages = success.data;
        });

        function isInitd() {
            return !!viewModel.pages;
        }
    }
};
