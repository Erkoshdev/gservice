<template>
  <div class="form-container">
    <div class="form-control-base">
      <date-picker
          v-model="date"
          :input-class="{
                'is-invalid': isError,
                'mx-input': 'mx-input',
            }"
          :type="typeDatePicker"
          :lang="lang"
          :format="format"
          :disabled-date="disabledDate"
          :range="range"
          :placeholder='placeholder'
          :clearable="clearable"
          @input="(item) => $emit('input',this.$moment(item).format(format))"
      >
        <template v-slot:icon-calendar>
          <i class="icon icon-chevron-down"></i>
        </template>
      </date-picker>
    </div>
  </div>
</template>

<script >
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/kk';
import 'vue2-datepicker/locale/ru';
import store from "@/store";
export default {
  name: 'CustomDatePicker',
  props:{
    title:{
      type:String,
      default:''
    },
    range:{
      type:Boolean,
      default:false,
    },
    defaultData:{
      type:String
    },
    isDisabled:{
      type:Boolean,
      default:false,
    },
    typeDatePicker:{
      type:String,
    },
    format:{
      type:String
    },
    isError:{
      type:Boolean
    },
    placeholder:{
      type:String
    },
    clearable: {
      type:Boolean,
      default: false
    },
  },
  data() {
    return {
      lang:store.getters.lang,
      timeStart:'',
      timeEnd:'',
      date:null,
    }
  },
  methods:{
    disabledDate(date) {
      if( this.isDisabled)
        return date >= new Date(new Date().setDate(new Date().getDate()-1));
    }
  },
  created() {
    if(this.defaultData){
    this.date = new Date(this.defaultData);
   }
  },
  watch:{
    defaultData(){
      if(this.defaultData){
        this.date = new Date(this.defaultData);
      }
    }, 
  },
  components: {
    DatePicker
  },

}
</script>

<style>
.mx-datepicker {
  width: 100% !important;
}
.mx-input {
  height: initial!important;
  box-shadow: none;
}
.mx-icon-calendar {
  right: 12px;
}

/* .custom-datepicker {
    max-width: 200px;
} */
.is-invalid{
  border-color: red!important;
}
</style>
