'use strict';

module.exports = {
    templateUrl: 'view/create/editor/element/nav-element.html',
    bindings: {
        pages: '<',
        element: '<',
        isEditing: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.pages;
        viewModel.element;
        viewModel.isEditing;
    }
};
