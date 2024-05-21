<template>
    <div class="page-wrapper add-advert-page">
      <div class="internal-wrapper"  v-if="!result.title">
        <div></div>
        <div class="redact">
          <div class="redact-title">
            <a class="redact-back-link" @click="$router.go(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0405 4.29289C12.431 4.68342 12.431 5.31658 12.0405 5.70711L7.08075 10.6667H19.3334C19.8857 10.6667 20.3334 11.1144 20.3334 11.6667C20.3334 12.219 19.8857 12.6667 19.3334 12.6667H7.08075L12.0406 17.627C12.4311 18.0175 12.431 18.6507 12.0405 19.0412C11.6499 19.4317 11.0168 19.4316 10.6263 19.0411L3.9596 12.3737L3.94646 12.3603C3.93213 12.3455 3.91826 12.3302 3.90487 12.3144L3.9596 12.3737C3.93197 12.3461 3.90629 12.3173 3.88257 12.2874C3.87063 12.2722 3.8589 12.2565 3.84763 12.2404C3.83934 12.2288 3.83167 12.2173 3.82426 12.2058C3.81635 12.1933 3.80837 12.1802 3.80069 12.1669C3.79217 12.1524 3.78425 12.1378 3.77671 12.1231C3.7064 11.9861 3.66675 11.831 3.66675 11.6667C3.66675 11.5023 3.7064 11.3472 3.77667 11.2104C3.78427 11.1955 3.7922 11.1809 3.80051 11.1665C3.80837 11.1531 3.81635 11.14 3.82462 11.1272C3.8317 11.116 3.83937 11.1045 3.8473 11.0932C3.8589 11.0768 3.87063 11.0611 3.8828 11.0458C3.88979 11.0369 3.89715 11.0279 3.90469 11.0191C3.91826 11.0032 3.93213 10.9879 3.94646 10.973C3.9507 10.9686 3.95515 10.9641 3.95964 10.9596L10.6263 4.29289C11.0168 3.90237 11.65 3.90237 12.0405 4.29289Z" fill="#6D7885" />
              </svg>
            </a>
            <p>{{ $t('add_resume') }}</p>
          </div>
          <div class="redact-container redact-form">
            <app-select :label="$t('Choose_special_equipment')" :options="vehicles" label-name="title" v-model="vehicle_id" :reduce="item => item.id"></app-select>
            <app-select :label="$t('region')" :options="regions" label-name="title" v-model="region_id" :reduce="item => item.id"></app-select>
            <app-select :label="$t('Payment_method')" :options="percentage" label-name="title" v-model="by_percentage" :reduce="item => item.code"></app-select>
            <app-input :label="$t('price')" type="number" v-model="amount"></app-input>
          </div>
          <app-button class="redact-btn" type="btn-warning" size="btn-md" @action="handleSave">{{ $t('add') }}</app-button>
        </div>
        <div></div>
      </div>
      <the-add-success
        v-if="result.title"
        @goPage="goPage"
        :item="result"/>
    </div>
  </template>

  <script>
  import AppButton from "@/components/AppButton";
  import AppInput from "@/components/AppForms/AppInput";
  import AppSelect from "@/components/AppForms/AppSelect";
  import API from "@/api";
  import TheAddSuccess from "@/views/TheAddProducts/TheAddSuccess"
  export default {
    name: "TheRepair",

    components: {
      AppButton,
      AppInput,
      AppSelect,
      TheAddSuccess
    },

    data() {
      return {
        result:{
          title:null,
          text:null
        },
        id:this.$route.params.id,
        region_id:null,
        vehicle_id:null,
        by_percentage:null,
        amount:'',
        regions: [],
        vehicles:[],
        uploadFiles:[],

      }
    },
    created() {
      this.getRegions();
      this.getVehicles();
      this.fetchData();
    },
    computed: {
      percentage() {
      return [
          {
            code:1,
            title: this.$t('By_prices'),
          },
          {
            code:2,
            title: this.$t('by_percent'),
          },
        ];
      }
    },
    methods: {
      goPage(){
        this.$router.push({name: 'TheFilterOperator'})
      },
      onFileChange(e) {
        e.preventDefault();
        for (let i = 0; i < e.target.files.length; i++) {
          e.target.files[i].src =  window.URL.createObjectURL( e.target.files[i])
          this.uploadFiles.push(e.target.files[i]);
        }
      },
      fetchData(){
        if(this.id){
          const params = {
            id: this.$route.params.id
          }
          API.product.getDriver({params}).then((res) => {
            this.region_id = res.driver_application.region.id
            this.vehicle_id = res.driver_application.vehicle_id
            this.by_percentage = res.driver_application.by_percentage+1
            this.amount = res.driver_application.amount
          });
        }
      },
      handleSave(){
        this.$store.commit('setSpinnerLoader', true);
        if(this.agreed) {
          this.agreed = 1
        }else {
          this.agreed =0;
        }
        const formData = new FormData();
        formData.append("region_id", this.region_id);
        formData.append("vehicle_id", this.vehicle_id);
        formData.append("by_percentage", this.by_percentage-1);
        formData.append("amount", this.amount);
        if(!this.id) {
          API.productAdd.driver(formData).then((res) => {
            this.$store.commit('setSpinnerLoader', false);
              if(res.success){
                  this.result.title = res.driver_application.region.title;
                  this.result.text = res.driver_application.mark.title;
                }
                else{
                  Object.values(res.errors).forEach(val => {
                      this.$notify({
                          text: val,
                        })
                    });
                }

            });
        }else {
          formData.append("id", this.id);
          API.productAdd.driverUpdate(formData).then((res) => {
              if(res.success){
                  this.result.title = res.driver_application.region.title;
                  this.result.text = res.driver_application.mark.title;
              }else{
                Object.values(res.errors).forEach(val => {
                    this.$notify({
                        text: val,
                      })
                  });
              }
            });
        }


      },
      getVehicles() {
        API.filter.getUserVehicles().then((res) => {
            this.vehicles = res.vehicles.map((el) => {
                return {
                    id: el.id,
                    title: el.type.title,
                }
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
      },

      getRegions() {
        API.filter.getRegions()
            .then((res) => {
              this.regions = res.regions
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              // this.$store.commit("SET_LOADER", false);
            });
      },



    }
  }
  </script>

  <style scoped></style>
