<template>
  <div class="page-wrapper add-advert-page">
    <div class="internal-wrapper">
      <div></div>
      <div class="add-advert">
        <div class="add-advert-title">
          <p>{{ $t('to_add_advert') }}</p>
        </div>
        <div class="shop-status">
          <template v-if="reject">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.9967 26.6666C39.5367 26.6666 39.1633 27.0399 39.1667 27.4999C39.1667 27.9599 39.54 28.3333 40 28.3333C40.46 28.3333 40.8333 27.9599 40.8333 27.4999C40.8333 27.0399 40.46 26.6666 39.9967 26.6666" stroke="#E64646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M40 70V70C23.43 70 10 56.57 10 40V40C10 23.43 23.43 10 40 10V10C56.57 10 70 23.43 70 40V40C70 56.57 56.57 70 40 70Z" stroke="#E64646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M40 40V56.6667" stroke="#E64646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <b> {{ $t('rejected') }}</b>
            <p> {{ $t('our_anager_will_contact_you_soon') }}</p>
            <router-link class="btn btn-lg btn-warning" :to="{name: 'TheAddAdvert'}">{{ $t('contin') }}</router-link>
          </template>
          <template v-else>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.6665 41.6667L36.6665 51.6667L53.3332 31.6667" stroke="#63B9BA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M39.9998 73.3334C58.4093 73.3334 73.3332 58.4096 73.3332 40.0001C73.3332 21.5906 58.4093 6.66675 39.9998 6.66675C21.5903 6.66675 6.6665 21.5906 6.6665 40.0001C6.6665 58.4096 21.5903 73.3334 39.9998 73.3334Z" stroke="#63B9BA" stroke-width="4"/>
            </svg>
            <b> {{ $t('awaiting') }}</b>
            <p>{{ $t('our_anager_will_contact_you_soon') }}</p>
            <router-link class="btn btn-lg btn-warning" :to="{name: 'TheAddAdvert'}">{{ $t('contin') }}</router-link>
          </template>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheShopStatus",

  data() {
    return {
      reject: this.$route.query.reject
    }
  },
}
</script>

<style scoped>

</style>
