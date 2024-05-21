<template>
  <div class="auth-page">
    <div class="auth-container login-container">
      <div class="auth-container-img">
        <h2>G Service</h2>
        <h3>{{ $t('equipments_number_one') }}</h3>
      </div>
      <div class="auth-container-caption">
        <div class="auth-container-title">
          <p>{{ $t('to_come_in') }}</p>
        </div>
        <div class="auth-container-form">
          <app-input
              :label="$t('phone_number')"
              v-model="phone"
              v-mask="'+7(###)#######'"
              @enter="sendRequest"
          ></app-input>
          <app-input
              :label="$t('password')"
              v-model="pwd"
              type="password"
              @enter="sendRequest"
          >
          </app-input>
          <router-link :to="{name: 'TheResetPwd'}" class="text-link">{{ $t('forgot_your_password') }}</router-link>
          <app-button type="btn-warning" size="btn-lg" @action="sendRequest">{{ $t('to_come_in') }}</app-button>
          <div class="not-account-text">
            <hr>
            <span>{{ $t('not_have_account') }}</span>
            <hr>
          </div>
          <app-button type="btn-stroke-warning" size="btn-lg" @action="sendRegistration">{{ $t('create_an_account') }}</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppInput from "@/components/AppForms/AppInput";
import AppButton from "@/components/AppButton";
import API from "@/api"
export default {
  name: "TheLogin",

  components: {
    AppInput,
    AppButton
  },

  data() {
    return {
      phone: '',
      pwd: '',
    }
  },
  methods: {
    sendRequest() {
      API.authApi.login({ phone: this.phone, password: this.pwd }).then((res) => {
        if (res.success) {
          this.$store.dispatch('login', res.user_token);
          this.$store.commit('setProfile', res.user);
          this.$router.push('/');
        } else {
            this.$notify({
              text: res.error,
            })
        }
      })
    },
    sendRegistration() {
      this.$router.push({ name: 'TheRegistration' })
    }
  }
}
</script>

<style scoped></style>
