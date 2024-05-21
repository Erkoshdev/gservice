<template>
  <ul class="tab">
    <li class="tab-item">
      <a class="tab-link active" href=""> {{ $t('long_term') }}</a>
    </li>
    <li class="tab-item">
      <a class="tab-link" href=""> {{ $t('by_the_hour') }} </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppTab",
}
</script>

<style scoped>

</style>
