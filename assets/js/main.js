import Vue from 'vue';

import { components } from './components';
import { directives } from './directives';

const $app = window.$app || {};

if ($app.devMode === 'true') {
    Vue.config.devtools = true;
}

if ($app.devMode === 'false') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

Vue.prototype.$global = $app;

window.$vue = new Vue({
    el: '#root',
    delimiters: ['[[', ']]'],
    components,
    directives,
});
