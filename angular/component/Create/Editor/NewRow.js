'use strict';

module.exports = {
    templateUrl: 'view/create/editor/new-row.html',
    bindings: {
        row: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.row;
    }
};
