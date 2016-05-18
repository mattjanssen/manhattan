'use strict';

module.exports = {
    templateUrl: 'view/create/create.html',
    controller: function($scope, PageResource) {
        var viewModel = this;

        var editingPage = null;

        viewModel.pages = null;

        viewModel.isInitd = isInitd;
        viewModel.editPage = editPage;
        viewModel.getEditingPage = getEditingPage;

        $scope.$watchCollection('$ctrl.pages', function (newArray, oldArray) {
            if (!newArray) {
                // This watch is fired upon init, before the array is even populated.
                return;
            }

            console.log(newArray, oldArray);
        });

        // Populate the existing templates list.
        PageResource.query().$promise.then(function (success) {
            viewModel.pages = success.data;

            if (viewModel.pages.length) {
                editPage(viewModel.pages[0]);
            }
        });

        /**
         * Check if Component is Fully Loaded
         *
         * This will be true once all necessary data is asynchronously loaded.
         *
         * @returns {boolean}
         */
        function isInitd() {
            return !!viewModel.pages;
        }

        /**
         * Begin Editing a Page
         *
         * This is called from child components.
         *
         * @param page
         */
        function editPage(page) {
            editingPage = page;
            $scope.$broadcast('page.edit', page);
        }

        /**
         * Get Page Being Edited
         * 
         * @returns page
         */
        function getEditingPage() {
            return editingPage;
        }
    }
};
