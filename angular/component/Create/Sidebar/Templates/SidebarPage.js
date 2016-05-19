'use strict';

module.exports = {
    /**
     * Sidebar Template Bar
     *
     * Handles existing templates.
     */
    templateUrl: 'view/create/sidebar/templates/sidebar-page.html',
    bindings: {
        removeTemplate: '<',
        editPage: '<',
        template: '<', // @TODO: Rename to page.
        editingPage: '<'
    },
    controller: function($scope, PageResource) {
        var viewModel = this;

        // Data and functions brought in from bindings, available to the view.
        viewModel.removeTemplate;
        viewModel.editPage;
        viewModel.template;
        viewModel.editingPage;

        // Data available to the view.
        viewModel.triggerEdit = false;
        viewModel.editing = false;
        viewModel.deleteHovering = false;

        // Functions available to the view.
        viewModel.edit = edit;
        viewModel.remove = remove;
        viewModel.onTileClick = onTileClick;
        viewModel.isEditing = isEditing;

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

            // Clicking on a tile opens it for viewing.
            viewModel.editPage(viewModel.template);
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
