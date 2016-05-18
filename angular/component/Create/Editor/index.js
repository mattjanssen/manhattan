'use strict';

require('angular').module('app')
    .component('editor', require('./Editor'))
    .component('pageEditor', require('./PageEditor'))
    .component('newRow', require('./NewRow'))
    .component('row', require('./Row'))
;
