'use strict';

module.exports = {
    templateUrl: 'view/create/editor/row.html',
    bindings: {
        pages: '<',
        row: '<',
        removeRow: '&',
        isEditing: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.pages;
        viewModel.row;
        viewModel.removeRow;
        viewModel.isEditing;

        viewModel.removeElement = removeElement;

        function removeElement(element) {
            _.pull(viewModel.row.elements, element);

            if (!viewModel.row.elements.length) {
                viewModel.removeRow();
            }
        }
    }
};
