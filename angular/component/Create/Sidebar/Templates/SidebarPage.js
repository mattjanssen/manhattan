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
        addTemplate: '<',
        removeTemplate: '<',
        editPage: '<',
        template: '<', // @TODO: Rename to page.
        editingPage: '<'
    },
    controller: function($scope, PageResource) {
        var viewModel = this;

        // Data and functions brought in from bindings, available to the view.
        viewModel.addTemplate;
        viewModel.removeTemplate;
        viewModel.editPage;
        viewModel.template;
        viewModel.editingPage;

        // Data available to the view.
        viewModel.saved = !!viewModel.template.id;
        viewModel.triggerEdit = false;
        viewModel.editing = false;
        viewModel.deleteHovering = false;

        // Functions available to the view.
        viewModel.edit = edit;
        viewModel.submit = submit;
        viewModel.remove = remove;
        viewModel.onTileClick = onTileClick;
        viewModel.isEditing = isEditing;

        // Register watches.
        $scope.$watch('$ctrl.template.name', onNameChange);

        /**
         * Handle General Clicks on the Template Tile
         *
         * Note: There are specific handlers for the buttons within the tile.
         */
        function onTileClick($event) {
            if (viewModel.editing) {
                // If the tile is already being edited, then do nothing.
                return;
            }

            if (viewModel.saved) {
                // Clicking on a saved tile opens it for viewing.
                viewModel.editPage(viewModel.template);

                return;
            }

            // Clicking anywhere on a new template tile enables editing of the title.
            edit($event);
        }

        /**
         * Enable Editing and Focus on Title Input
         */
        function edit($event) {
            viewModel.editing = true;

            // This boolean is being watched by a FocusOn directive in the title input.
            // If set to true, the input gains focus, and this boolean is set back to false.
            viewModel.triggerEdit = true;

            // Don't let the click bubble to the entire tile.
            $event.stopPropagation();
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
                _.assign(viewModel.template, success.data);
            });

            // Tell parent component that a new template has been added.
            viewModel.addTemplate(viewModel.template);
        }

        /**
         * Delete this template.
         */
        function remove($event) {
            PageResource.remove(viewModel.template);

            // Tell parent component that this template was deleted.
            // The parent already has a reference to the template object, and doesn't need to be passed in.
            viewModel.removeTemplate(viewModel.template);

            // Don't let the click bubble to the entire tile.
            $event.stopPropagation();
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

        /**
         * Check if Page is Being Edited
         *
         * Used to apply CSS styles to button repeat.
         *
         * @param page
         * @returns {boolean}
         */
        function isEditing() {
            return viewModel.template === viewModel.editingPage;
        }
    }
};
