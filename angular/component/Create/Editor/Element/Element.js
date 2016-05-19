'use strict';

module.exports = {
    templateUrl: 'view/create/editor/element.html',
    bindings: {
        pages: '<',
        element: '<',
        removeElement: '&',
        isEditing: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.pages;
        viewModel.element;
        viewModel.removeElement;
        viewModel.isEditing;
        
        viewModel.editing = false;
        viewModel.deleteHovering = false;
    }
};
