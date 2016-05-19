'use strict';

require('angular').module('app')
    .component('element', require('./Element'))
    .component('imageElement', require('./ImageElement'))
    .component('navElement', require('./NavElement'))
    .component('textElement', require('./TextElement'))
    .component('titleElement', require('./TitleElement'))
;
