'use strict';

module.exports = {
    templateUrl: 'view/create/editor/element.html',
    bindings: {
        element: '<',
        removeElement: '&'
    },
    controller: function() {
        var viewModel = this;

        viewModel.element;
        viewModel.removeElement;
    }
};
