'use strict';

module.exports = {
    templateUrl: 'view/home/home.html',
    controller: function(AuthenticationService) {
        var viewModel = this;

        viewModel.login = AuthenticationService.login;
    }
};
