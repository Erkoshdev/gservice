<template>
  <div class="form-container">
    <div
        class="form-control-base"
    >
      <v-select
          :options="options"
          :components="{OpenIndicator}"
          @input="(item) => $emit('input', item)"
          :value="value"
          :label="labelName"
          :ref="name"
          :clearable="clearable"
          :placeholder="placeholder"
          :reduce="reduce"
      >
        <template v-slot:no-options>
          <div class="vs-select__no-options">
            {{ $t('no_data') }}
          </div>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css'

export default {
  name: "AppSelectBase",

  components: {
    vSelect
  },

  data() {
    return {
      OpenIndicator: {
        render: createElement => createElement('i', {class: {'icon icon-chevron-down': true}}),
      },
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
    placeholder: {
      type: String,
    },
    reduce: {
      type: Function,
    }
  },

  methods: {
    clearSelection() {
      this.$refs[this.name].clearSelection();
    },
  }
}
</script>

<style lang="scss">

</style>
