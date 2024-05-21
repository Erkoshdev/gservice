<template>
  <div class="page-wrapper">
    <div class="internal-wrapper">
      <div class="internal-sidebar internal-sidebar-left">
        <app-profile-card> </app-profile-card>
        <app-sidebar-nav></app-sidebar-nav>
      </div>
      <div class="internal-content">
        <div class="internal-content-header">
          <b>{{ $t('change_pwd') }}</b>
          <app-button type="btn-success" size="btn-sm" @action="handleUpdate">{{ $t('save_pwd') }}</app-button>
        </div>
        <div class="internal-content-body">
          <form  class="profile-edit-form">
            <div class="form-half">
              <app-input
                  :label="$t('enter_old_pwd')"
                  type="password"
                  v-model="old_password"
              ></app-input>
              <app-input
                  :label="$t('new_password')"
                  type="password"
                  v-model="password"
              ></app-input>
              <app-input
                  :label="$t('repeat_new_pwd')"
                  type="password"
                  v-model="password_confirmation"
              ></app-input>
            </div>
          </form>
        </div>
      </div>
      <div class="internal-sidebar internal-sidebar-right">
        <app-advert-card></app-advert-card>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppForms/AppInput";
import AppProfileCard from "@/components/AppProfileCard";
import AppAdvertCard from "@/components/AppAdvertCard";
import AppSidebarNav from "@/components/AppSidebarNav";
export default {
  name: "TheProfilePwd",

  components: {
    AppButton,
    AppInput,
    AppProfileCard,
    AppAdvertCard,
    AppSidebarNav
  },

  data() {
    return {
      old_password: '',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    handleUpdate(){
      const form ={
        old_password:this.old_password,
        password:this.password,
        password_confirmation:this.password_confirmation,
      }
      API.profile.updatePsw(form).then((res)=>{
        if(res.success){
          this.$notify({
                  text: this.$t('success_update'),
                })
        }
        else{
          if(typeof res.errors === 'string' ){
            this.$notify({
                  text: res.errors,
                })

            }else {
              Object.values(res.errors).forEach(val => {
                this.$notify({
                    text: val,
                  })
              });
            }
          }
      });
    }
  }
}
</script>

<style scoped>

</style>
