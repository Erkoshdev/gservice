<template>
  <div id="app">
    <div class="wrapper">
      <the-header></the-header>
      <div class="main" id="main">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
      <the-footer></the-footer>
      <!--классы "show" - полностью и "show-section" - без header и aside-->
      <div class="overlay" :class="{show: showOverlay, 'show-section': showSectionOverlay}"></div>
      <v-notify-wrapper />
      <app-loading />
      <!--      <app-feedback-modal></app-feedback-modal>-->
    </div>
  </div>
</template>

<script>

import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import AppLoading from "@/components/AppLoading";
import { mapGetters } from 'vuex';
// import AppFeedbackModal from "@/modals/AppFeedbackModal";

export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
    AppLoading
    // AppFeedbackModal
  },

  computed: {
    ...mapGetters([
    ]),
    showOverlay() {
      return this.$store.getters.isOverlay
    },
    showSectionOverlay() {
      return this.$store.getters.isShortOverlay
    }
  },

  methods: {
    handleSelectLang(locale, callback) {
      callback();
    },
  }
}
</script>

<style>

</style>
