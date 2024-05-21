<template>
  <div class="modal-window">
    <div class="modal-container sm">
      <div class="modal-header">
        <div class="modal-title">Пожаловаться</div>
        <button class="btn-plain close-modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="#B8C1CC"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="error-list">
          <div class="error-item">
            <input type="checkbox" value="1" v-model="error">
            На заплатил вовремя
          </div>
          <div class="error-item">
            <input type="checkbox" value="1" v-model="error">
            На заплатил вовремя
          </div>
          <div class="error-item">
            <input type="checkbox" value="1" v-model="error">
            На заплатил вовремя
          </div>
          <div class="error-item">
            <input type="checkbox" value="1" v-model="error">
            На заплатил вовремя
          </div>
          <div class="error-item">
            <input type="checkbox" value="1" v-model="error">
            На заплатил вовремя
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFeedbackModal",
  data() {
    return {
      error: [],
    }
  }
}

</script>

<style scoped>

</style>
