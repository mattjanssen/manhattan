'use strict';

module.exports = {
    templateUrl: 'view/create/editor/row.html',
    bindings: {
        row: '<',
        removeRow: '&'
    },
    controller: function() {
        var viewModel = this;

        viewModel.row;
        viewModel.removeRow;

        viewModel.removeElement = removeElement;

        function removeElement(element) {
            _.pull(viewModel.row.elements, element);

            if (!viewModel.row.elements.length) {
                viewModel.removeRow();
            }
        }
    }
};
