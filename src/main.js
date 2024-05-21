import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import 'vue-select/dist/vue-select.css'
import '@/assets/styles/index.scss'
import vClickOutside from 'v-click-outside'
import init from '@/configuration/init';
import AppNotify from '@/components/AppNotify';
import VueMask from 'v-mask'
import { i18n } from './plugins/i18n';


Vue.config.productionTip = false;
Vue.use(vClickOutside);
Vue.use(AppNotify);
Vue.use(require('vue-moment'));
Vue.use(VueMask);


init(store, () => {
  new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
  }).$mount('#app')
});
