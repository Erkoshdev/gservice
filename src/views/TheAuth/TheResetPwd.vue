<template>
  <div class="auth-page">
    <div class="auth-container pwd-reset-container">
      <div class="auth-container-img">
        <h2>G Service</h2>
        <h3>{{ $t('equipments_number_one') }}</h3>
      </div>
      <div class="auth-container-caption">
        <div class="auth-container-title" v-if="!successNewPsw">
          <a class="btn-plain auth-back-link" @click="$router.go(-1)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0405 4.29289C12.431 4.68342 12.431 5.31658 12.0405 5.70711L7.08075 10.6667H19.3334C19.8857 10.6667 20.3334 11.1144 20.3334 11.6667C20.3334 12.219 19.8857 12.6667 19.3334 12.6667H7.08075L12.0406 17.627C12.4311 18.0175 12.431 18.6507 12.0405 19.0412C11.6499 19.4317 11.0168 19.4316 10.6263 19.0411L3.9596 12.3737L3.94646 12.3603C3.93213 12.3455 3.91826 12.3302 3.90487 12.3144L3.9596 12.3737C3.93197 12.3461 3.90629 12.3173 3.88257 12.2874C3.87063 12.2722 3.8589 12.2565 3.84763 12.2404C3.83934 12.2288 3.83167 12.2173 3.82426 12.2058C3.81635 12.1933 3.80837 12.1802 3.80069 12.1669C3.79217 12.1524 3.78425 12.1378 3.77671 12.1231C3.7064 11.9861 3.66675 11.831 3.66675 11.6667C3.66675 11.5023 3.7064 11.3472 3.77667 11.2104C3.78427 11.1955 3.7922 11.1809 3.80051 11.1665C3.80837 11.1531 3.81635 11.14 3.82462 11.1272C3.8317 11.116 3.83937 11.1045 3.8473 11.0932C3.8589 11.0768 3.87063 11.0611 3.8828 11.0458C3.88979 11.0369 3.89715 11.0279 3.90469 11.0191C3.91826 11.0032 3.93213 10.9879 3.94646 10.973C3.9507 10.9686 3.95515 10.9641 3.95964 10.9596L10.6263 4.29289C11.0168 3.90237 11.65 3.90237 12.0405 4.29289Z" fill="#6D7885"/>
            </svg>
          </a>
          <p>{{ $t('forgot_pwd_title') }}</p>
        </div>
        <div class="auth-container-form">
          <div class="pwd-reset-phone" v-if="!checkPhone">
            <div class="reset-pwd-text">
              <p>{{ $t('enter_phone_number_which_you_registered_service') }}</p>
            </div>
            <app-input
                :label="$t('phone_number')"
                v-model="phone"
                v-mask="'+7(###)#######'"
            ></app-input>
            <router-link class="text-link" :to="{name: 'TheLogin'}">{{ $t('I_remembered_the_password') }}</router-link>
            <app-button type="btn-warning" size="btn-lg" @action="sendNumber">{{ $t('reestablish') }}</app-button>
          </div>
          <div class="pwd-reset-confirm"  v-if="checkPhone && !checkCode">
            <div class="reset-pwd-text">
              <p>{{ $t('code_is_send') }}</p>
            </div>
            <div class="check-number-form">
              <input type="text" placeholder="00000" class="filled" maxlength="5" @keyup.enter="sendCode"  v-model="code">
            </div>
            <app-button type="btn-warning" size="btn-lg" @action="sendCode">{{ $t('send') }}</app-button>
          </div>
          <div class="pwd-reset-new" v-if="checkCode && !successNewPsw">
            <app-input
                :label="$t('create_new_password')"
                v-model="newPwd"
                type="password"
                @enter="resetPsw"
            ></app-input>
            <app-input
                :label="$t('repeat_password')"
                v-model="confirmNewPwd"
                type="password"
                @enter="resetPsw"
            ></app-input>
            <app-button type="btn-warning" size="btn-lg" @action="resetPsw">{{ $t('save') }}</app-button>
          </div>
          <div class="success-container" v-if="successNewPsw">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.6665 41.6667L36.6665 51.6667L53.3332 31.6667" stroke="#63B9BA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M39.9998 73.3334C58.4093 73.3334 73.3332 58.4096 73.3332 40.0001C73.3332 21.5906 58.4093 6.66675 39.9998 6.66675C21.5903 6.66675 6.6665 21.5906 6.6665 40.0001C6.6665 58.4096 21.5903 73.3334 39.9998 73.3334Z" stroke="#63B9BA" stroke-width="4"/>
            </svg>
            <p>{{ $t('password_saved_successfully') }}</p>
            <b>{{ $t('congratulations') }}</b>
            <router-link class="btn btn-warning btn-lg" :to="{name: 'TheLogin'}">{{ $t('go_to_authorize') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppInput from "@/components/AppForms/AppInput";
import AppButton from "@/components/AppButton";
import API from "@/api";

export default {
  name: "TheResetPwd",

  components: {
    AppInput,
    AppButton,
  },

  data() {
    return {
      phone: '',
      newPwd: '',
      confirmNewPwd: '',
      code:null,
      checkPhone:false,
      checkCode:false,
      successNewPsw:false,
    }
  },
  methods:{
    sendCode(){
      console.log('test');
      API.authApi.checkSms({ phone: this.phone,sms_code:this.code}).then((res) => {
        if (res.success) {
          console.log(res);
          this.checkCode = true;
        } else {
            this.$notify({
              text: res.errors,
            })
        }
      })
    },
    resetPsw(){
      console.log('test');
      API.authApi.resetPsw(
        {
          phone: this.phone,
          sms_code:this.code,
          password:this.newPwd,
          password_confirmation:this.confirmNewPwd
        }
        ).then((res) => {
        if (res.success) {
          console.log(res);
          this.successNewPsw =true

        } else {
            this.$notify({
              text: res.errors,
            })
        }
      })
    },

    sendNumber(){
      API.authApi.sendSms({ phone: this.phone}).then((res) => {
        if (res.success) {
         this.checkPhone=true
        } else {
            this.$notify({
              text: res.error,
            })
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
