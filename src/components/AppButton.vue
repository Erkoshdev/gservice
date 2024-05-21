<template>
  <button
    class="btn"
    :class="[type, size]"
    @click="$emit('action')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  emits: ['action'],
  props: {
    type: {
      type: String,
      default: 'btn-warning'
    },
    size: {
      type: String,
      default: 'btn-md',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>
