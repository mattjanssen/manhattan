'use strict';

require('angular').module('app')
    .component('editor', require('./Editor'))
    .component('element', require('./Element'))
    .component('pageEditor', require('./PageEditor'))
    .component('newRow', require('./NewRow'))
    .component('row', require('./Row'))
;
