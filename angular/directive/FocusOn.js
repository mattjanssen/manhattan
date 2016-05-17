'use strict';

module.exports = function () {
    return {
        scope: {
            trigger: '=focusOn'
        },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === true) {
                    element[0].focus();
                    scope.trigger = false;
                }
            });
        }
    };
};
