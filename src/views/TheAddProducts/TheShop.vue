<template>
    <div class="page-wrapper add-advert-page">
      <div class="internal-wrapper" v-if="!result.title">
        <div></div>
        <div class="redact">
          <div class="redact-title">
            <a class="redact-back-link" @click="$router.go(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0405 4.29289C12.431 4.68342 12.431 5.31658 12.0405 5.70711L7.08075 10.6667H19.3334C19.8857 10.6667 20.3334 11.1144 20.3334 11.6667C20.3334 12.219 19.8857 12.6667 19.3334 12.6667H7.08075L12.0406 17.627C12.4311 18.0175 12.431 18.6507 12.0405 19.0412C11.6499 19.4317 11.0168 19.4316 10.6263 19.0411L3.9596 12.3737L3.94646 12.3603C3.93213 12.3455 3.91826 12.3302 3.90487 12.3144L3.9596 12.3737C3.93197 12.3461 3.90629 12.3173 3.88257 12.2874C3.87063 12.2722 3.8589 12.2565 3.84763 12.2404C3.83934 12.2288 3.83167 12.2173 3.82426 12.2058C3.81635 12.1933 3.80837 12.1802 3.80069 12.1669C3.79217 12.1524 3.78425 12.1378 3.77671 12.1231C3.7064 11.9861 3.66675 11.831 3.66675 11.6667C3.66675 11.5023 3.7064 11.3472 3.77667 11.2104C3.78427 11.1955 3.7922 11.1809 3.80051 11.1665C3.80837 11.1531 3.81635 11.14 3.82462 11.1272C3.8317 11.116 3.83937 11.1045 3.8473 11.0932C3.8589 11.0768 3.87063 11.0611 3.8828 11.0458C3.88979 11.0369 3.89715 11.0279 3.90469 11.0191C3.91826 11.0032 3.93213 10.9879 3.94646 10.973C3.9507 10.9686 3.95515 10.9641 3.95964 10.9596L10.6263 4.29289C11.0168 3.90237 11.65 3.90237 12.0405 4.29289Z" fill="#6D7885" />
              </svg>
            </a>
            <p>{{ $t('Create_store') }}</p>
          </div>
          <div class="redact-container redact-form">
            <app-select :label="$t('region')" :options="areas" label-name="title" v-model="region_id" :reduce="item => item.id"></app-select>
            <app-select :label="$t('city')" :options="regions" label-name="title" v-model="city" ></app-select>
            <app-input :label="$t('name')" type="text" v-model="name"></app-input>
            <app-input :label="$t('BIN_IIN')" type="text" v-model="identificator"></app-input>
            <app-input :label="$t('phone')" type="text" v-model="phone"  v-mask="'8(###)#######'"></app-input>
          </div>
          <div class="redact-container redact-upload" v-if="id">
            <b class="redact-container-title">{{ $t('logo') }}</b>
            <div class="redact-upload-list">
                <img :src="logo" alt="">
            </div>
          </div>
          <div class="redact-container redact-upload">
            <b class="redact-container-title">{{ $t('Upload_store_logo') }}</b>
            <div class="redact-upload-list">
              <div class="redact-upload-form" v-if="uploadFiles.url">
                <img :src="uploadFiles.url" alt="">
              </div>
              <div class="redact-upload-form" >
                <input type="file"
                @change="onFileChange" >
              </div>
            </div>
          </div>
          <div class="redact-container redact-text">
            <b class="redact-container-title">{{ $t('Description') }}</b>
            <textarea placeholder="Напишите описание" rows="6" v-model="description"></textarea>
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
    name: "TheShop",

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
          text:null,
          images:[]
        },
        name:'',
        id:this.$route.params.id,
        region_id:null,
        city:null,
        identificator:'',
        phone:'',
        fuel_type_id:null,
        in_stock:null,
        price:null,
        year:null,
        logo:null,
        agreed:0,
        description:'',
        sctockList:[
          {
            id:1,
            title:'В наличии',
          },
          {
            id:0,
            title:'На заказ',
          },
        ],
        vehiclesTypes: [],
        marks: [],
        regions: [],
        type: '',
        text: '',
        vehicleStatus:[],
        fules:[],
        uploadFiles:{},
        images:[],
        areas:[]
      }
    },
    created() {
      this.getVehicles();
      this.getMarks();
      this.getRegions();
      this.getFuels();
      this.getVehicleStatus();
      this.fetchData();
      this.getAreas();
    },
    methods: {
      goPage(){
        this.$router.push({name: 'TheFilterShop'})
      },
      onFileChange(e) {
        e.preventDefault();
        this.uploadFiles= e.target.files[0]
        this.uploadFiles.url=  window.URL.createObjectURL( e.target.files[0])
      },
      fetchData(){
        if(this.id){
          const params = {
            id: this.$route.params.id
          }
          API.product.getMyShop({params}).then((res) => {
            console.log(res);
            this.region_id = res.shop.region.id
            this.city = {
                id:res.shop.city_id,
                title:res.shop.city
            }
            this.name = res.shop.name
            this.identificator = res.shop.identificator
            this.phone = res.shop.phone
            this.logo = res.shop.logo;
            this.description = res.shop.description;
          });
        }
      },
      handleSave(){
        this.$store.commit('setSpinnerLoader', true);
        const formData = new FormData();
        formData.append("region_id", this.region_id);
        formData.append("city_id", this.city.id);
        formData.append("city", this.city.title);
        formData.append("identificator", this.identificator);
        formData.append("phone", this.phone);
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append('logo',this.uploadFiles);
          API.productAdd.shop(formData).then((res) => {
            this.$store.commit('setSpinnerLoader', false);
            if(res.success){
              this.$router.push('/add-advert')
            } else {
              Object.values(res.errors).forEach(val => {
                  console.log(val);
                  this.$notify({
                      text: val,
                    })
                });
            }
          });
      },
      getVehicles() {
        API.filter.getVehicles()
          .then((res) => {
            this.vehiclesTypes= res.fuel_types;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
      },
      getMarks() {
        API.filter.getMarks()
            .then((res) => {
              this.marks = res.marks
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              // this.$store.commit("SET_LOADER", false);
            });
      },
      getAreas() {
        API.filter.getAreas()
            .then((res) => {
              this.areas =  res.areas.map((el) => {
                return {
                    id: el.id,
                    title: el.title,
                }
              });
              console.log(this.areas);
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
      getFuels(){
        API.filter.getFuels()
            .then((res) => {
             this.fules = res.fuel_types

            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              // this.$store.commit("SET_LOADER", false);
            });
      },
      getVehicleStatus(){
        API.filter.getVehicleStatus()
            .then((res) => {
           this.vehicleStatus = res.vehicle_statuses

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
