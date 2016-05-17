'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/templates/templates.html',
    controller: function() {
        var viewModel = this;

        // Add one empty template.
        viewModel.templates = [{
            name: ''
        }];

        viewModel.addTemplate = addTemplate;
        viewModel.removeTemplate = removeTemplate;

        function addTemplate() {
            viewModel.templates.push({
                name: ''
            });
        }

        function removeTemplate(template) {
            _.pull(viewModel.templates, template)
        }
    }
};
