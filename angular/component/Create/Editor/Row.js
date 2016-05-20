'use strict';

module.exports = {
    templateUrl: 'view/create/editor/row.html',
    bindings: {
        pages: '<',
        row: '<',
        removeRow: '&',
        isEditing: '<'
    },
    controller: function($scope) {
        var viewModel = this;

        viewModel.pages;
        viewModel.row;
        viewModel.removeRow;
        viewModel.isEditing;
        viewModel.uiDraggableOptions = {
            revert: 'invalid',
            revertDuration: 0
        };

        viewModel.removeElement = removeElement;

        $scope.$watch('$ctrl.row.elements.length', watchElementsLength);

        /**
         * Remove Element from this Row
         *
         * @param element
         */
        function removeElement(element) {
            _.pull(viewModel.row.elements, element);
        }

        /**
         * Watch for Changes in Elements Array Length
         *
         * Deleted this row if all elements are removed.
         *
         * @param length
         */
        function watchElementsLength(length) {
            if (length === 0) {
                viewModel.removeRow();
            }
        }
    }
};
