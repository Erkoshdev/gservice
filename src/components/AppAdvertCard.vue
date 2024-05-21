<template>
  <div class="add-service-card">
    <img src="@/assets/img/main/carra.png" alt="">
    <b>{{ $t('add_advert_title') }}</b>
    <p>{{ $t('add_advert_text') }}</p>
    <app-button type="btn-warning" size="btn-md" @action="addAdvert">+ {{ $t('add') }}</app-button>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";

export default {
  name: "AppAdvertCard",

  components: {
    AppButton
  },

  methods: {
    addAdvert() {
      if(this.$store.getters.loggedIn) {
        this.$router.push({name: 'TheAddAdvert'})
      } else {
        this.$router.push({name: 'TheLogin'})
        this.$notify({
          text: this.$t('need_to_authorize'),
        })
      }
    }

  }
}
</script>

<style scoped>

</style>
