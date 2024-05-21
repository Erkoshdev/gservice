<template>
  <div class="notification">
    <div class="notification-top">
      <!--статусы "error", "info", "success"-->
      <span class="notification-status error"></span>
      <p class="notification-name">{{ item.title }}</p>
      <span class="notification-date">{{ item.created_at | moment("DD.MM.YYYY HH:mm") }}</span>
    </div>
    <div class="notification-content">
      <p class="notification-text">{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNotification",

  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
