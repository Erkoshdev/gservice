<template>
  <div class="loader" :class="{'show': spinnerLoader}">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="200px"
         height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="84" cy="50" r="10" fill="#e2b47f">
        <animate attributeName="r" repeatCount="indefinite" dur="0.7352941176470588s" calcMode="spline" keyTimes="0;1"
                 values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
        <animate attributeName="fill" repeatCount="indefinite" dur="2.941176470588235s" calcMode="discrete"
                 keyTimes="0;0.25;0.5;0.75;1" values="#f7941d;#eda450;#f7941d;#f28100;#f7941d" begin="0s"></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#f7941d">
        <animate attributeName="r" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#f28100">
        <animate attributeName="r" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7352941176470588s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7352941176470588s"></animate>
      </circle>
      <circle cx="84" cy="50" r="10" fill="#f7941d">
        <animate attributeName="r" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4705882352941175s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.4705882352941175s"></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#eda450">
        <animate attributeName="r" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.205882352941176s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="2.941176470588235s" calcMode="spline"
                 keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                 keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-2.205882352941176s"></animate>
      </circle>
    </svg>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "AppLoading",

  computed: {
    ...mapGetters([
      'spinnerLoader'
    ])
  }
}
</script>

<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(245, 245, 245, 0.7);
  backdrop-filter: blur(3px);
}

.loader.show {
  display: flex;
}
</style>
