'use strict';

module.exports = {
    templateUrl: 'view/create/editor/editor.html',
    bindings: {
        pages: '<',
        isEditing: '<'
    },
    controller: function($scope) {
        var viewModel = this;

        viewModel.pages;
        viewModel.isEditing;
    }
};
