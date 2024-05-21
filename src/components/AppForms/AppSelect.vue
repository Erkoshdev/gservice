<template>
  <div class="form-container">
    <div
        class="form-control"
        :class="{focus: isFocus, filled: isBlur && value}"
    >
      <span class="form-control-title">{{ label }}</span>
      <v-select
          :options="options"
          :components="{OpenIndicator}"
          @input="(item) => $emit('input', item)"
          :value="value"
          :label="labelName"
          :ref="name"
          :reduce="reduce"
          :clearable="clearable"
          @search:blur="onBlurInput"
          @search:focus="onFocusInput"
      >
        <template v-slot:no-options>
          <div class="vs-select__no-options">
            {{ $t('no_data') }}
          </div>
        </template>
      </v-select>
    </div>
<!--    <small>error</small>-->
  </div>
</template>

<script>
import vSelect from 'vue-select';


export default {
  name: "AppSelect",

  components: {
    vSelect
  },

  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('i', {class: {'icon icon-chevron-down': true}}),
      },
      isFocus: false,
      isBlur: false,
    }
  },

  props: {
    label: {
      type: String,
    },
    labelName: {
      type: String,
    },
    name: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      required: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    reduce: {
      type: Function,
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.isBlur = !!val;
      }
    }
  },

  methods: {
    clearSelection() {
      this.$refs[this.name].clearSelection();
    },
    onFocusInput() {
      this.isFocus = true;
    },
    onBlurInput() {
      this.isFocus = false;
      this.isBlur = true;
    }
  }
}
</script>

<style lang="scss">

</style>
