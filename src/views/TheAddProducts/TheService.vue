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
            <p>{{ $t('create_service') }}</p>
          </div>
          <div class="redact-container redact-form">
            <app-select :label="$t('region')" :options="regions" label-name="title" v-model="region_id" :reduce="item => item.id"></app-select>
            <app-select :label="$t('equipment_type')" :options="vehiclesTypes" label-name="title" v-model="vehicle_type_id" :reduce="item => item.id"></app-select>
            <app-select :label="$t('mark')" :options="marks" label-name="title" v-model="mark_id" :reduce="item => item.id"></app-select>
            <app-input :label="$t('model')" type="text" v-model="model"></app-input>
            <app-input :label="$t('vin_code')" type="text" v-model="vin"></app-input>
          </div>
          <div class="redact-container redact-upload" v-if="id">
            <b class="redact-container-title">{{ $t('equipment_photo') }}</b>
            <div class="redact-upload-list">
              <div class="redact-upload-form" v-for="(file, indexKey) in images" :key="indexKey">
                <img :src="file.url" alt="">
              </div>
            </div>
          </div>
          <div class="redact-container redact-upload">
            <b class="redact-container-title">{{ $t('upload_photo_equipment') }}</b>
            <div class="redact-upload-list">
              <div class="redact-upload-form" v-for="(file, index) in uploadFiles" :key="index">
                <div class="remove-icon" @click="handleRemoveFile(index)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.1378 21H7.85782C6.81082 21 5.94082 20.192 5.86282 19.147L4.96582 7H18.9998L18.1328 19.142C18.0578 20.189 17.1868 21 16.1378 21V21Z"
                      stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 11V17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M4 7H20" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17 7L15.987 4.298C15.694 3.517 14.948 3 14.114 3H9.886C9.052 3 8.306 3.517 8.013 4.298L7 7"
                      stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.4298 11L14.9998 17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M8.57016 11L9.00016 17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
                <img :src="file.url" alt="">
              </div>
              <div class="redact-upload-form"  v-if="uploadFiles.length < 6">
                <input type="file"
                @change="onFileChange" multiple>
              </div>
            </div>
          </div>
          <div class="redact-container redact-text">
            <b class="redact-container-title">{{ $t('Description') }}</b>
            <textarea :placeholder="$t('write_desc')" rows="6" v-model="description"></textarea>
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
    name: "TheService",

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
        vehicle_type_id:null,
        mark_id:null,
        model:'',
        vin:'',
        description:'',
        vehiclesTypes: [],
        marks: [],
        regions: [],
        type: '',
        text: '',
        uploadFiles:[],
        images:[]
      }
    },
    created() {
      this.getVehicles();
      this.getMarks();
      this.getRegions();
      this.fetchData();
    },
    methods: {
      goPage(){
        this.$router.push({name: 'TheFilterService'})
      },
      handleRemoveFile(index) {
      this.uploadFiles.splice(index, 1);
    },
    onFileChange(e) {
      e.preventDefault();
      const maxImagesCount = 6;

      if(this.uploadFiles.length < maxImagesCount) {
        for (let i = 0; i < e.target.files.length; i++) {
          if(maxImagesCount > i && this.uploadFiles.length < maxImagesCount ) {
            e.target.files[i].url = window.URL.createObjectURL(e.target.files[i])
            this.uploadFiles.push(e.target.files[i]);
          }
        }
        if(e.target.files.length > maxImagesCount ) {
          this.maxImageNotify();
        }
      }else{
        this.maxImageNotify();
      }
    },
    maxImageNotify(){
      this.$notify({
        text: this.$t('max_6_photo'),
      })
    },
      fetchData(){
        if(this.id){
          const params = {
            id: this.$route.params.id
          }
          API.product.getService({params}).then((res) => {
            this.region_id = res.vehicle.driver.region.id
            this.vehicle_type_id = res.vehicle.type.id
            this.mark_id = res.vehicle.mark.id
            this.model = res.vehicle.model
            this.vin = res.vehicle.vin
            this.images = res.vehicle.images;
            this.description = res.vehicle.description;
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
        formData.append("type_id", this.vehicle_type_id);
        formData.append("mark_id", this.mark_id);
        formData.append("model", this.model);
        formData.append("vin", this.vin);
        formData.append("description", this.description);
        for( var i = 0; i < this.uploadFiles.length; i++ ){
          let file = this.uploadFiles[i];
          formData.append('images[' + i + ']',file);
        }
        if(!this.id) {
          API.productAdd.vehicle(formData).then((res) => {
            this.$store.commit('setSpinnerLoader', false);
            if (res.success) {
                 this.result.title = res.vehicle.type.title;
                this.result.text = res.vehicle.mark.title;
                this.result.images = res.vehicle.images;
            }
            else {
              Object.values(res.errors).forEach(val => {
                this.$notify({
                  text: val,
                })
              });
            }
          });
        } else {
          formData.append("vehicle_id", this.id);
            API.productAdd.serviceUpdate(formData).then((res) => {
              this.$store.commit('setSpinnerLoader', false);
              if (res.success) {
                  this.result.title = res.vehicle.type.title;
                  this.result.text = res.vehicle.mark.title;
                  this.result.images = res.vehicle.images;
              }else {
                this.$store.commit('setSpinnerLoader', false);
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
