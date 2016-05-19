'use strict';

module.exports = {
    templateUrl: 'view/create/editor/page-editor.html',
    bindings: {
        pages: '<',
        page: '<',
        isEditing: '<'
    },
    controller: function($scope, PageResource) {
        var viewModel = this;

        // Data from Parent Component
        viewModel.pages;
        viewModel.page;
        viewModel.isEditing;

        // Initialize View Data
        viewModel.newRow = createEmptyRow();

        // Methods for the View
        viewModel.removeRow = removeRow;
        viewModel.saveNewRow = saveNewRow;

        // Initialize Watches
        $scope.$watch('$ctrl.page', watchPage, true); // Deep watch on the object.

        /**
         * Persist Any Changes to the Page
         *
         * @param page
         * @param oldPage
         */
        function watchPage(page, oldPage) {
            if (!page || !oldPage || page === oldPage) {
                // No changes to persist.
                return;
            }

            PageResource.put(page);
        }

        /**
         * Watch for Elements Being Added to the New Rows
         *
         * @param elements
         */
        function saveNewRow(elements, beforeRow) {
            if (!elements || !elements.length) {
                // No new element at this point.
                return;
            }

            // Add the row. Make sure page has a rows array.
            viewModel.page.rows || (viewModel.page.rows = []);

            var newRow = {
                elements: elements
            };

            if (beforeRow) {
                // Add new row above existing.
                var rowIndex = _.indexOf(viewModel.page.rows, beforeRow);
                viewModel.page.rows.splice(rowIndex, 0, newRow);
            } else {
                viewModel.page.rows.push(newRow);
            }
        }

        /**
         * Generate an Empty Row
         *
         * @returns row
         */
        function createEmptyRow() {
            return {
                elements: []
            };
        }

        /**
         * Remove a Row from Page
         *
         * @param row
         */
        function removeRow(row) {
            _.pull(viewModel.page.rows, row);
        }
    }
};
