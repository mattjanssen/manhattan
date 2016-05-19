'use strict';

module.exports = {
    templateUrl: 'view/create/editor/page-editor.html',
    bindings: {
        page: '<'
    },
    controller: function($scope) {
        var viewModel = this;

        viewModel.page;

        viewModel.newRow = createEmptyRow();

        $scope.$watchCollection('$ctrl.newRow.elements', watchNewRowElements);

        function watchNewRowElements(elements) {
            if (!elements || !elements.length) {
                // No new element at this point.
                return;
            }

            viewModel.page.rows.push(viewModel.newRow);

            viewModel.newRow = createEmptyRow();
        }

        function createEmptyRow() {
            return {
                elements: []
            };
        }
    }
};
