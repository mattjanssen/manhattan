'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/templates/templates.html',
    controller: function (PageResource) {
        var viewModel = this;

        // Add one empty template.
        viewModel.templates = [];

        viewModel.addTemplate = addTemplate;
        viewModel.removeTemplate = removeTemplate;

        // Populate the existing templates list.
        PageResource.query().$promise.then(function (success) {
            viewModel.templates = success.data;
            appendBlankTemplate();
        });

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
            _.pull(viewModel.templates, template)
        }

        /**
         * Add a Blank Template to the Bottom of the List
         */
        function appendBlankTemplate() {
            viewModel.templates.push({
                name: ''
            });
        }
    }
};
