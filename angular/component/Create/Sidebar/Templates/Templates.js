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
    controller: function () {
        var viewModel = this;

        viewModel.pages;
        viewModel.editPage;
        viewModel.getEditingPage;

        viewModel.pageAdded = pageAdded;
        viewModel.removeTemplate = removeTemplate;

        if (viewModel.pages.length) {
        }

        appendBlankTemplate();

        /**
         * Call after Adding a Page
         *
         * @param page
         */
        function pageAdded(page) {
            if (viewModel.pages.length === 1) {
                // If this is the first page being added, then open it for editing.
                viewModel.editPage(page);
            }

            // Add another placeholder.
            appendBlankTemplate();
        }

        /**
         * Called by Child Component after Deleting a Template
         */
        function removeTemplate(template) {
            _.pull(viewModel.pages, template)
        }

        /**
         * Add a Blank Template to the Bottom of the List
         */
        function appendBlankTemplate() {
            viewModel.pages.push({
                name: ''
            });
        }
    }
};
