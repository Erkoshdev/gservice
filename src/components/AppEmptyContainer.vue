<template>
  <div class="empty-container">
    <img :src="require(`@/assets/img/icon/${img}.svg`)" alt="">
    <b>{{ title }}</b>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "AppEmptyContainer",

  props: {
    img: {
      type: String,
      default: 'order-lg'
    },
    title: String,
    text: String,
  }
}
</script>

<style scoped>

</style>
