import VNotifyWrapper from "./VNotifyWrapper";

export default {
  install(Vue) {
    if (!Vue.prototype.$eventHub) {
      Vue.prototype.$eventHub = new Vue();
    }

    Vue.prototype.$notify = (object = {
      text: '',
      duration: 2000,
    }, position = 'top-right') => {
      // Для переноса в конец выполнения
      setTimeout(() => {
        Vue.prototype.$eventHub.$emit('v-notify-show', {
          ...object,
          position,
        });
      }, 0);
    };

    Vue.component('v-notify-wrapper', VNotifyWrapper);
  },
}
