'use strict';

module.exports = {
    templateUrl: 'view/page/header.html',
    controller: function($state, AuthenticationService) {
        var viewModel = this;

        viewModel.isPage = isPage;
        viewModel.login = AuthenticationService.login;
        viewModel.logout = AuthenticationService.logout;

        function isPage(page) {
            return $state.current.name === page;
        }
    }
};
