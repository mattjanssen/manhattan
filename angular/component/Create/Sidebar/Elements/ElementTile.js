'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/elements/element-tile.html',
    controller: function () {
        var viewModel = this;

        viewModel.element = {
            type: 'title',
        }

        viewModel.uiDraggableOptions = {
            revert: 'invalid',
            revertDuration: 0,
            cursorAt: {
                top: 44,
                left: 56
            }
        };
    }
};
