import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from "@/store";
import en from '../langs/en.json'
import ru from '../langs/ru.json'
import kk from '../langs/kk.json'
Vue.use(VueI18n)


export const i18n = new VueI18n({
    locale:store.state.auth.lang,
    fallbacklocale:'ru',
    messages:{
        en,
        ru,
        kk
    }
})
