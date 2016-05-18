'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/templates/templates.html',
    bindings: {
        pages: '<'
    },
    controller: function () {
        var viewModel = this;

        viewModel.pages;

        viewModel.addTemplate = addTemplate;
        viewModel.removeTemplate = removeTemplate;

        appendBlankTemplate();

        /**
         * Called by Child Component after Adding a Template
         */
        function addTemplate() {
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
