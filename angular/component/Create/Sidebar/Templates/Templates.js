'use strict';

module.exports = {
    /**
     * Edit Templates Sidebar
     *
     * This will not be instantiated by the parent component until the pages have been loaded.
     * Pages array is guaranteed at this point.
     */
    templateUrl: 'view/create/sidebar/templates/templates.html',
    bindings: {
        pages: '<',
        editPage: '<',
        getEditingPage: '<'
    },
    controller: function ($timeout) {
        var viewModel = this;

        viewModel.pages;
        viewModel.editPage;
        viewModel.getEditingPage;

        viewModel.newPage = getBlankTemplate();

        viewModel.addPage = addPage;
        viewModel.removeTemplate = removeTemplate;

        /**
         * Call after Adding a Page
         *
         * @param page
         */
        function addPage() {
            viewModel.pages.push(viewModel.newPage);

            if (viewModel.pages.length === 1) {
                // If this is the first page being added, then open it for editing.
                viewModel.editPage(viewModel.newPage);
            }

            // Reset the placeholder.
            viewModel.newPage = null;
            $timeout(function () {
                viewModel.newPage = getBlankTemplate();
            });
        }

        /**
         * Called by Child Component after Deleting a Template
         */
        function removeTemplate(template) {
            _.pull(viewModel.pages, template)
        }

        /**
         * Get a Blank Page
         */
        function getBlankTemplate() {
            return {
                name: ''
            };
        }
    }
};
