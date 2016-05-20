'use strict';

module.exports = {
    templateUrl: 'view/create/create.html',
    controller: function($scope, $state, $stateParams, PageResource) {
        var viewModel = this;

        var editingPage = null;
        var urlPageId = $stateParams.id;

        viewModel.pages = null;

        viewModel.isInitd = isInitd;
        viewModel.editPage = editPage;
        viewModel.getEditingPage = getEditingPage;
        viewModel.isEditing = isEditing;

        $scope.$watchCollection('$ctrl.pages', function (newArray, oldArray) {
            if (!newArray) {
                // This watch is fired upon init, before the array is even populated.
                return;
            }

            if (!_.includes(newArray, editingPage)) {
                // The page being edited has been removed.
                if (newArray.length) {
                    editingPage = newArray[0];
                } else {
                    editingPage = null;
                }
            }

            console.log(newArray, oldArray);
        });

        // Populate the existing templates list.
        PageResource.query().$promise.then(function (success) {
            viewModel.pages = success.data;

            if (!viewModel.pages.length) {
                return
            };

            var urlPage = _.find(viewModel.pages, {id: urlPageId});
            if (urlPage) {
                editPage(urlPage);
            } else {
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
            $state.transitionTo('create', {id: page.id}, {notify: false, reload: false});
        }

        /**
         * Get Page Being Edited
         *
         * @returns page
         */
        function getEditingPage() {
            return editingPage;
        }

        /**
         * Check if Page is Being Edited
         *
         * Used to apply CSS styles to button repeat.
         *
         * @param page
         * @returns {boolean}
         */
        function isEditing(page) {
            return page === getEditingPage();
        }
    }
};
