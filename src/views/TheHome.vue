<template>
  <div class="page-wrapper">
    <div class="slider">
      <div class="slider-caption">
        <img src="@/assets/img/logo/logo-lg.png" alt="">
        <h1>G Service</h1>
        <h2>{{ $t('equipments_number_one') }}</h2>
        <app-button
          type="btn-warning"
          size="btn-lg"
          @action="$router.push({name: 'TheFilterVehicle'})"
        >{{ $t('start_work') }}</app-button>
      </div>
      <div class="slider-img">
        <img src="@/assets/img/main/promo-bg.png" alt="">
      </div>
    </div>
    <div class="promo">
      <div class="promo-container">
        <div class="promo-item promo-xl">
          <h6>{{ $t('specialequipment') }}</h6>
          <p>{{ $t('equipment_desc') }}</p>
          <img src="@/assets/img/main/tractor.png" alt="">
          <router-link class="absolute-link" :to="{name: 'TheFilterVehicle'}"></router-link>
        </div>
      </div>
      <div class="promo-container">
        <div class="promo-item">
          <img class="promo-icon" src="@/assets/img/main/order-icon.png" alt="">
          <h6>{{ $t('orders') }}</h6>
          <p>{{ $t('orders_desc') }}</p>
          <router-link class="absolute-link" :to="{name: 'TheFilterOrder'}"></router-link>
        </div>
        <div class="promo-item">
          <h6>{{ $t('remont') }}</h6>
          <p>{{ $t('repair_desc') }}</p>
          <img src="@/assets/img/main/wrench.png" alt="">
          <img src="@/assets/img/main/gears.png" alt="">
          <router-link class="absolute-link" :to="{name: 'TheFilterRepair'}"></router-link>
        </div>
        <div class="promo-item">
          <img class="promo-icon" src="@/assets/img/main/bag-icon.png" alt="">
          <h6>{{ $t('Services') }}</h6>
          <p>{{ $t('services_desc') }}</p>
          <router-link class="absolute-link" :to="{name: 'TheFilterService'}"></router-link>
        </div>
        <div class="promo-item">
          <img class="promo-icon" src="@/assets/img/main/truck-icon.png" alt="">
          <h6>{{ $t('Logistics') }}</h6>
          <p>{{ $t('logistics_desc') }}</p>
          <span class="promo-note" style="background: #2787F5;">{{ $t('soon') }}</span>
<!--          <router-link class="absolute-link" to=""></router-link>-->
        </div>
        <div class="promo-item">
          <img class="promo-icon" src="@/assets/img/main/steering-wheel-icon.png" alt="">
          <h6>{{ $t('operator') }}</h6>
          <p>{{ $t('operator_desc') }}</p>
          <span class="promo-note" style="background: #E64646;">{{ $t('new') }}</span>
          <router-link class="absolute-link" :to="{name: 'TheFilterOperator'}"></router-link>
        </div>
      </div>
      <div class="promo-container">
        <div class="promo-item promo-xl">
          <img src="@/assets/img/main/brake-disk.png" alt="">
          <h6>{{ $t('shop') }}</h6>
          <p>{{ $t('shop_desc') }}</p>
          <img src="@/assets/img/main/crankshaft.png" alt="">
          <router-link class="absolute-link" :to="{name: 'TheFilterShop'}"></router-link>
        </div>
      </div>
    </div>
    <div class="mobile-platform">
      <div class="section-title">
        <p v-html="$t('mobile_app_title')"></p>
      </div>
      <div class="mobile-platform-row">
        <div class="mobile-platform-box mobile-platform-account">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.04167 32.5417C5.76389 32.5417 4.68778 32.09 3.81333 31.1867C2.93778 30.2844 2.5 29.2083 2.5 27.9583V18.4583C2.5 17.625 2.79167 16.9167 3.375 16.3333C3.95833 15.75 4.66667 15.4583 5.5 15.4583H14V8.625C14 8.20833 14.1461 7.85389 14.4383 7.56167C14.7294 7.27056 15.0833 7.125 15.5 7.125H21.5417C22.8194 7.125 23.9028 7.56944 24.7917 8.45833C25.6806 9.34722 26.125 10.4306 26.125 11.7083V18.5H28.0417V16.4167C28.0417 16.0278 28.1178 15.6528 28.27 15.2917C28.4233 14.9306 28.6389 14.6111 28.9167 14.3333L30.25 13C30.6111 12.6389 31.0417 12.4928 31.5417 12.5617C32.0417 12.6317 32.4028 12.9028 32.625 13.375L37.4167 22.375C37.6944 22.875 37.6878 23.375 37.3967 23.875C37.1044 24.375 36.6667 24.625 36.0833 24.625H30.9583C30.1528 24.625 29.465 24.34 28.895 23.77C28.3261 23.2011 28.0417 22.5139 28.0417 21.7083V21H26.125V24.3333C26.6806 24.7778 27.1178 25.3122 27.4367 25.9367C27.7567 26.5622 27.9167 27.2361 27.9167 27.9583C27.9167 29.2083 27.4722 30.2844 26.5833 31.1867C25.6944 32.09 24.6111 32.5417 23.3333 32.5417C22.3056 32.5417 21.3889 32.2361 20.5833 31.625C19.7778 31.0139 19.2222 30.2083 18.9167 29.2083H11.4583C11.1528 30.2083 10.5972 31.0139 9.79167 31.625C8.98611 32.2361 8.06944 32.5417 7.04167 32.5417ZM7.04167 30.0417C7.625 30.0417 8.125 29.8333 8.54167 29.4167C8.95833 29 9.16667 28.5139 9.16667 27.9583C9.16667 27.375 8.95833 26.8817 8.54167 26.4783C8.125 26.0761 7.63889 25.875 7.08333 25.875C6.5 25.875 6.00667 26.0761 5.60333 26.4783C5.20111 26.8817 5 27.375 5 27.9583C5 28.5139 5.19444 29 5.58333 29.4167C5.97222 29.8333 6.45833 30.0417 7.04167 30.0417ZM23.3333 30.0417C23.9167 30.0417 24.4094 29.8333 24.8117 29.4167C25.215 29 25.4167 28.5139 25.4167 27.9583C25.4167 27.375 25.215 26.8817 24.8117 26.4783C24.4094 26.0761 23.9167 25.875 23.3333 25.875C22.75 25.875 22.2572 26.0761 21.855 26.4783C21.4517 26.8817 21.25 27.375 21.25 27.9583C21.25 28.5139 21.4517 29 21.855 29.4167C22.2572 29.8333 22.75 30.0417 23.3333 30.0417ZM14 26.7083V17.9583H5.5C5.36111 17.9583 5.24333 18.0067 5.14667 18.1033C5.04889 18.2011 5 18.3194 5 18.4583V24C5.30556 23.7778 5.63222 23.6178 5.98 23.52C6.32667 23.4233 6.69444 23.375 7.08333 23.375C8.08333 23.375 8.99333 23.6806 9.81333 24.2917C10.6322 24.9028 11.1806 25.7083 11.4583 26.7083H14ZM16.5 26.7083H18.9167C19.1944 25.7083 19.7433 24.9028 20.5633 24.2917C21.3822 23.6806 22.3056 23.375 23.3333 23.375H23.625V21H16.5V26.7083ZM34.4583 22.125L31.0833 15.7083L30.7083 16.125C30.6528 16.1528 30.6111 16.1944 30.5833 16.25C30.5556 16.3056 30.5417 16.3611 30.5417 16.4167V21.7083C30.5694 21.8194 30.6183 21.9167 30.6883 22C30.7572 22.0833 30.8472 22.125 30.9583 22.125H34.4583ZM16.5 18.5H23.625V11.7083C23.625 11.125 23.4233 10.6317 23.02 10.2283C22.6178 9.82611 22.125 9.625 21.5417 9.625H16.5V18.5ZM14 26.7083V23.375V24V17.9583V26.7083Z" fill="white"/>
          </svg>
          <p>{{ $t('mobile_app_register') }}</p>
          <router-link class="btn btn-light btn-lg" v-if="!$store.getters.loggedIn" :to="{name: 'TheRegistration'}">{{ $t('create_an_account') }}</router-link>
          <img src="@/assets/img/main/screen-registration1.png" alt="">
        </div>
        <div class="mobile-platform-box mobile-platform-service">
          <div class="mobile-platform-img">
            <img src="@/assets/img/main/screen-service.png" alt="">
          </div>
          <div class="mobile-platform-caption">
            <p>{{ $t('mobile_app_add_advert') }}</p>
          </div>
        </div>
        <div class="mobile-platform-box mobile-platform-earn">
          <div class="mobile-platform-caption">
            <p v-html="$t('mobile_app_earn')"></p>
          </div>
          <div class="mobile-platform-img">
            <img src="@/assets/img/main/screen-earn1.png" alt="">
          </div>
        </div>
      </div>
    </div>
<!--    <div class="partner">
      <div class="section-title">
        <p>Партнеры <br>с которыми мы работаем</p>
      </div>
      <div class="partner-list">
        <div class="partner-item">
          <img src="@/assets/img/content/cat.png" alt="">
          <p>Caterpillar</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/jcb.png" alt="">
          <p>JCB</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/hidromek.png" alt="">
          <p>Hidromek</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/sdlg.png" alt="">
          <p>SDLG</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/ferra.png" alt="">
          <p>Ferra filter</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/gulf.png" alt="">
          <p>Gulf</p>
          <a href="" class="absolute-link"></a>
        </div>
        <div class="partner-item">
          <img src="@/assets/img/content/bohnen.png" alt="">
          <p>BOHNENKAMP</p>
          <a href="" class="absolute-link"></a>
        </div>
      </div>
    </div>-->
    <div class="faq">
      <div class="section-title">
        <p v-html="$t('main_faq_title')"></p>
      </div>
      <div class="faq-list">
        <app-accordion>
          <app-accordion-item v-for="item in faqListSm" :key="item.id">
            <template slot="accordion-trigger">
              <p>{{ item.title }}</p>
              <i class="icon"></i>
            </template>
            <template slot="accordion-content">
              <p v-html="item.content"></p>
            </template>
          </app-accordion-item>
          <template v-if="isMoreFaq">
            <app-accordion-item v-for="item in faqListMore" :key="item.id">
              <template slot="accordion-trigger">
                <p>{{ item.title }}</p>
                <i class="icon"></i>
              </template>
              <template slot="accordion-content">
                <p v-html="item.content"></p>
              </template>
            </app-accordion-item>
          </template>
          <button class="btn-plain text-link" @click="isMoreFaq = !isMoreFaq">{{ isMoreFaq? $t('hide'): $t('show_more_faq') }}</button>
        </app-accordion>
      </div>
    </div>
    <div class="app-promo">
      <div class="app-promo-caption">
        <h6 v-html="$t('mobile_app_poster_title')"></h6>
        <ul>
          <li>
            <a href="https://apps.apple.com/kz/app/gservice/id1627674303" target="_blank">
              <img src="@/assets/img/main/app-store-light.png" alt="">
            </a>
          </li>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.gservice&pli=1" target="_blank">
              <img src="@/assets/img/main/google-play-light.png" alt="">
            </a>
          </li>
        </ul>
        <div class="app-qr">
          <img src="@/assets/img/content/qr.jpg" alt="">
          <p v-html="$t('mobile_app_qr')"></p>
        </div>
      </div>
      <div class="app-promo-img">
        <img src="@/assets/img/main/screen-app.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppAccordion from "@/components/Accordion/AppAccordion";
import AppAccordionItem from "@/components/Accordion/AppAccordionItem";
import API from "@/api";
export default {
  name: "TheHome",

  components: {
    AppButton,
    AppAccordion,
    AppAccordionItem,
  },

  data() {
    return {
      faqListSm: [],
      faqListMore: [],
      isMoreFaq: false,
    }
  },

  created() {
    this.fetchFaq()
  },

  methods: {
    fetchFaq() {
      API.main.getFaq()
          .then((res) => {
            this.faqListSm = res.guides.slice(0, 5);
            this.faqListMore = res.guides.slice(5);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    }
  }
}
</script>

<style scoped>

</style>
