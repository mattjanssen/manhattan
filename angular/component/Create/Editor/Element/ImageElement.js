'use strict';

module.exports = {
    templateUrl: 'view/create/editor/element/image-element.html',
    bindings: {
        element: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.element;
    }
};
