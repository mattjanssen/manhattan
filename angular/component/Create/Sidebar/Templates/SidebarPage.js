'use strict';

module.exports = {
    /**
     * Sidebar Template Bar
     *
     * Handles the new and existing states of the templates.
     * Allows for creating and editing of templates.
     */
    templateUrl: 'view/create/sidebar/templates/sidebar-page.html',
    bindings: {
        template: '<',
        addTemplate: '&',
        removeTemplate: '&'
    },
    controller: function($scope, PageResource) {
        var viewModel = this;

        // Data and functions brought in from bindings, available to the view.
        viewModel.addTemplate;
        viewModel.template;

        // Data available to the view.
        viewModel.saved = !!viewModel.template.id;
        viewModel.active = false;
        viewModel.triggerEdit = false;
        viewModel.editing = false;
        viewModel.deleteHovering = false;

        // Functions available to the view.
        viewModel.edit = edit;
        viewModel.submit = submit;
        viewModel.remove = remove;
        viewModel.onTileClick = onTileClick;

        // Register watches.
        $scope.$watch('$ctrl.template.name', onNameChange);

        /**
         * Handle General Clicks on the Template Tile
         *
         * Note: There are specific handlers for the buttons within the tile.
         */
        function onTileClick() {
            if (viewModel.saved) {
                // Saved template titles are only editable by clicking on the edit icon.
                return;
            }

            // Clicking anywhere on the new template tile enables editing of the title.
            edit();
        }

        /**
         * Enable Editing and Focus on Title Input
         */
        function edit() {
            viewModel.editing = true;

            // This boolean is being watched by a FocusOn directive in the title input.
            // If set to true, the input gains focus, and this boolean is set back to false.
            viewModel.triggerEdit = true;
        }

        /**
         * Submit a New Template
         */
        function submit() {
            if (viewModel.saved) {
                // Only new templates can be submitted.
                return;
            }

            if (viewModel.template.name.length === 0) {
                // Clicking on the submit icon should trigger an edit if a title hasn't been entered.
                edit();

                return;
            }

            viewModel.saved = true;
            viewModel.editing = false;

            // Persist the document to the server.
            PageResource.save(viewModel.template).$promise.then(function (success) {
                // Bring in the ID and other server-generated properties.
                _.assign(viewModel.pages, success.data);
            });

            // Tell parent component that a new template has been added.
            viewModel.addTemplate();
        }

        /**
         * Delete this template.
         */
        function remove() {
            PageResource.remove(viewModel.template);

            // Tell parent component that this template was deleted.
            // The parent already has a reference to the template object, and doesn't need to be passed in.
            viewModel.removeTemplate();
        }

        /**
         * Handle Changes to the Name
         *
         * @param template
         */
        function onNameChange() {
            if (!viewModel.template.id) {
                return;
            }

            PageResource.put(viewModel.template);
        }
    }
};
