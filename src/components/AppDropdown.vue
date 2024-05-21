<template>
  <div class="dropdown" :class="{show: show}">
    <div
        class="dropdown-base"
        @click="handleShow"
    >
      <slot name="base" :handleShow="handleShow"/>
    </div>
    <div
        v-if="show"
        class="dropdown-area"
    >
      <slot name="dropdown" :handleShow="handleShow"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDropdown",

  data() {
    return {
      show: false,
    }
  },

  mounted() {
    document.addEventListener('click', this.close);
  },

  methods: {
    handleShow() {
      this.show = !this.show;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
}
</script>

<style scoped>

</style>
