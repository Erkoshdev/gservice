import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'VNotifyWrapper',

  data() {
    return {
      items: [],
      maxVisible: 100,
    };
  },

  mounted() {
    this.$eventHub.$on('v-notify-show', this.addNotify);
  },

  methods: {
    addNotify(item) {
      if (this.items.length >= this.maxVisible) {
        this.removeNotify(0)();
      }

      const key = uuidv4();

      if (!item.duration) item.duration = 2000;

      setTimeout(() => {
        this.removeNotifyByKey(key);
      }, item.duration);

      this.items.push({
        ...item,
        key
      });
    },

    removeNotify(index) {
      return () => {
        this.items.splice(index, 1);
      }
    },

    removeNotifyByKey(key) {
      if (key) {
        this.items = this.items.filter((item) => key !== item.key);
      }
    },

    elNotify(item, itemIdx) {
      return this.$createElement('div', {
        key: item.text + item.key,
        staticClass: 'v-notify',
      }, [
        this.$createElement('div', {
          staticClass: 'v-notify__content',
        }, [
          this.$createElement('div', {
            staticClass: 'v-notify__text',
            domProps: {
              innerHTML: item.text,
            }
          })
        ]),
        this.$createElement('button', {
          staticClass: 'btn-plain v-notify__close',
          domProps: {
            innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<path d="M12.8373 3.16272C12.6203 2.94576 12.2686 2.94576 12.0516 3.16272L8 7.21467L3.94839 3.16272C3.73143 2.94576 3.37968 2.94576 3.16272 3.16272C2.96022 3.36521 2.94672 3.68513 3.12222 3.90328L3.16272 3.94839L7.21467 8L3.16272 12.0516L3.12222 12.0967C2.94672 12.3149 2.96022 12.6348 3.16272 12.8373C3.37968 13.0542 3.73143 13.0542 3.94839 12.8373L8 8.78533L12.0516 12.8373C12.2686 13.0542 12.6203 13.0542 12.8373 12.8373C13.0398 12.6348 13.0533 12.3149 12.8778 12.0967L12.8373 12.0516L8.78533 8L12.8373 3.94839L12.8778 3.90328C13.0533 3.68513 13.0398 3.36521 12.8373 3.16272Z" fill="white"/>\n' +
              '</svg>\n'
          },
          on: {
            click: this.removeNotify(itemIdx),
          },
        })
      ])
    },
  },
  render(h) {
    return h('transition-group', {
      staticClass: 'v-notify__wrapper',
    }, this.items.map((item, itemIdx) => {
      if (item.position === 'top-right') {
        return this.elNotify(item, itemIdx);
      }

      return undefined;
    }));
  },
}
