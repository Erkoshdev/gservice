<template>
  <div class="page-wrapper">
    <div class="internal-wrapper">
      <div class="internal-sidebar internal-sidebar-left">
        <app-profile-card> </app-profile-card>
        <app-sidebar-nav></app-sidebar-nav>
      </div>
      <div class="internal-content">
        <div class="internal-content-header">
          <b>{{ $t('settings') }}</b>
          <app-button type="btn-success" size="btn-sm" @action="handleUpdate">{{ $t('save_changes') }}</app-button>
        </div>
        <div class="internal-content-body">
          <form  class="profile-edit-form">
            <app-input
                :label="$t('full_name')"
                v-model="name"
            ></app-input>
            <app-select
              :options="regions"
              :clearable="true"
              label-name="title"
              :label="$t('enter_region')"
              v-model="region"
          ></app-select>
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
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppForms/AppInput";
import AppProfileCard from "@/components/AppProfileCard";
import AppAdvertCard from "@/components/AppAdvertCard";
import AppSidebarNav from "@/components/AppSidebarNav";
import API from "@/api";
import AppSelect from "@/components/AppForms/AppSelect";
export default {
  name: "TheProfileEdit",

  components: {
    AppSelect,
    AppButton,
    AppInput,
    AppProfileCard,
    AppAdvertCard,
    AppSidebarNav
  },

  data() {
    return {
      name: '',
      phone: '',
      email: '',
      pwd: '',
      newPwd: '',
      regions:[],
      region:{},
    }
  },
  mounted(){
    this.fetchData();
    this.getRegion();
  },
  methods: {
    getRegion() {
      API.filter.getRegions().then((res) => {
       this.regions= res.regions
      });
    },
    fetchData() {
      API.profile.getProfile().then((res) => {
        if(res.success) {
          this.name = res.user.name;
          this.phone = res.user.phone;
          this.email = res.user.email;
          this.region = res.user.region;
        }
      })
    },
    handleUpdate(){
      const form ={
        name:this.name,
        email:this.email,
        phone:this.phone,
        region_id:this.region.id,
      }
      API.profile.updateProfile(form).then((res)=>{
        if(res.success){
          this.$store.commit('setProfile', res.user);
          this.$notify({
                  text: this.$t('success_update'),
                })
        }
        else{
          Object.values(res.errors).forEach(val => {
              this.$notify({
                  text: val,
                })
            });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
