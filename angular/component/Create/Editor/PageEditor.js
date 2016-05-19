'use strict';

module.exports = {
    templateUrl: 'view/create/editor/page-editor.html',
    bindings: {
        page: '<'
    },
    controller: function($scope, PageResource) {
        var viewModel = this;

        viewModel.page;

        viewModel.newRow = createEmptyRow();

        $scope.$watch('$ctrl.page', watchPage, true); // Deep watch on the object.
        $scope.$watchCollection('$ctrl.newRow.elements', watchNewRowElements);

        function watchPage(page, oldPage) {
            if (!page || !oldPage || page === oldPage) {
                // No changes to persist.
                return;
            }

            PageResource.put(page);
        }

        function watchNewRowElements(elements) {
            if (!elements || !elements.length) {
                // No new element at this point.
                return;
            }

            viewModel.page.rows || (viewModel.page.rows = []);
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
