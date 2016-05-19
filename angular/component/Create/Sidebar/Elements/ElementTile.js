'use strict';

module.exports = {
    templateUrl: 'view/create/sidebar/elements/element-tile.html',
    bindings: {
        type: '<'
    },
    controller: function () {
        var viewModel = this;

        viewModel.type;

        viewModel.element = {
            type: viewModel.type,
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
