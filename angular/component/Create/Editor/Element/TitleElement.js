'use strict';

module.exports = {
    templateUrl: 'view/create/editor/element/title-element.html',
    bindings: {
        element: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.element;
    }
};
