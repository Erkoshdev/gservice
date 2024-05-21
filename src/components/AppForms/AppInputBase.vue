<template>
  <div class="form-container">
    <div class="form-control-base">
      <input
          :type="type"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
          min="0"
          step="1000"
          v-mask="vMask"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AppInputBase",
  props: {
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    vMask: {
      type: String,
      default: ''
    }
  },

}
</script>

<style scoped>

</style>
