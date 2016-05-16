'use strict';

module.exports = {
    templateUrl: 'view/page/header.html',
    controller: function($state) {
        var viewModel = this;

        viewModel.isPage = isPage;

        function isPage(page) {
            return $state.current.name === page;
        }
    }
};
