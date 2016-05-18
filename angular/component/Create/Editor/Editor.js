'use strict';

module.exports = {
    templateUrl: 'view/create/editor/editor.html',
    bindings: {
        pages: '<',
        editPage: '<',
        getEditingPage: '<'
    },
    controller: function($scope) {
        var viewModel = this;

        viewModel.pages;
        viewModel.editPage;
        viewModel.getEditingPage;

        viewModel.isEditing = isEditing;

        /**
         * Check if Page is Being Edited
         *
         * Used to apply CSS styles to button repeat.
         *
         * @param page
         * @returns {boolean}
         */
        function isEditing(page) {
            return page === viewModel.getEditingPage();
        }
    }
};
