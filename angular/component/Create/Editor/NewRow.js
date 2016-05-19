'use strict';

module.exports = {
    templateUrl: 'view/create/editor/new-row.html',
    bindings: {
        row: '<'
    },
    controller: function($timeout) {
        var viewModel = this;

        viewModel.row;

        viewModel.isOver = false;

        viewModel.onOver = onOver;
        viewModel.onOut = onOut;
        viewModel.onDrop = onDrop;

        /**
         * Handle Element Tile Hovering over Component
         */
        function onOver() {
            $timeout(function () {
                // $timeout used to ensure the digest cycle catches the change.
                // The plugin is not calling $digest or $apply.
                viewModel.isOver = true;
            });
        }

        /**
         * Handle Element Tile Leaving Component Area
         */
        function onOut() {
            $timeout(function () {
                viewModel.isOver = false;
            });
        }

        /**
         * Handle Element Drop
         */
        function onDrop() {
            $timeout(function () {
                viewModel.isOver = false;
            });
        }
    }
};
