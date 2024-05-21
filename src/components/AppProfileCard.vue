<template>
  <div class="profile-card">
    <p>{{$store.getters.getUserName}}</p>
    <span>8{{$store.getters.getPhone}}</span>
  </div>
</template>

<script>
export default {
  name: "AppProfileCard",
}
</script>

<style scoped>

</style>
