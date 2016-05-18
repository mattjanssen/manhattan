'use strict';

module.exports = {
    templateUrl: 'view/create/editor/page-editor.html',
    bindings: {
        page: '<'
    },
    controller: function() {
        var viewModel = this;

        viewModel.page;
    }
};
