{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

import api from './api/index.js';
import urls from './api/urls';
import "./utils/rem";
import 'babel-polyfill'
import Es6Promise from 'es6-promise'

Es6Promise.polyfill();
import base from './utils/base.js';
// import "vant/lib/index.css";
import Vant, {Lazyload, Notify, Toast} from "vant";

Vue.use(api);
Vue.use(urls);
Vue.use(base);
Vue.use(Vant);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Lazyload);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
