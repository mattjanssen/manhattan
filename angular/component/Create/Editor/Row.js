'use strict';

module.exports = {
    templateUrl: 'view/create/editor/row.html',
    bindings: {
        row: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.row;
    }
};
