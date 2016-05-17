'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/templates/create-sidebar-page.html',
    bindings: {
        template: '<',
        addTemplate: '&',
        removeTemplate: '&'
    },
    controller: function() {
        var viewModel = this;

        viewModel.addTemplate;

        viewModel.template;
        viewModel.saved = false;
        viewModel.active = false;
        viewModel.triggerEdit = false;
        viewModel.editing = false;
        viewModel.deleteHovering = false;

        viewModel.edit = edit;
        viewModel.submit = submit;
        viewModel.remove = remove;
        viewModel.onTileClick = onTileClick;

        function onTileClick() {
            if (!viewModel.saved) {
                edit();
            }
        }

        function edit() {
            viewModel.editing = true;
            viewModel.triggerEdit = true;
        }

        function submit() {
            console.log('submit');
            if (viewModel.template.name.length === 0) {
                edit();

                return;
            }

            viewModel.saved = true;
            viewModel.editing = false;
            viewModel.addTemplate();
        }

        function remove() {
            viewModel.removeTemplate();
        }
    }
};
