<template>
  <div class="page-wrapper product-page">
    <div class="product-wrapper">
      <div class="product-main">
        <div class="product-container">
          <div class="product-container-top">
            <a class="product-back-link" @click="$router.go(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0405 4.29289C12.431 4.68342 12.431 5.31658 12.0405 5.70711L7.08075 10.6667H19.3334C19.8857 10.6667 20.3334 11.1144 20.3334 11.6667C20.3334 12.219 19.8857 12.6667 19.3334 12.6667H7.08075L12.0406 17.627C12.4311 18.0175 12.431 18.6507 12.0405 19.0412C11.6499 19.4317 11.0168 19.4316 10.6263 19.0411L3.9596 12.3737L3.94646 12.3603C3.93213 12.3455 3.91826 12.3302 3.90487 12.3144L3.9596 12.3737C3.93197 12.3461 3.90629 12.3173 3.88257 12.2874C3.87063 12.2722 3.8589 12.2565 3.84763 12.2404C3.83934 12.2288 3.83167 12.2173 3.82426 12.2058C3.81635 12.1933 3.80837 12.1802 3.80069 12.1669C3.79217 12.1524 3.78425 12.1378 3.77671 12.1231C3.7064 11.9861 3.66675 11.831 3.66675 11.6667C3.66675 11.5023 3.7064 11.3472 3.77667 11.2104C3.78427 11.1955 3.7922 11.1809 3.80051 11.1665C3.80837 11.1531 3.81635 11.14 3.82462 11.1272C3.8317 11.116 3.83937 11.1045 3.8473 11.0932C3.8589 11.0768 3.87063 11.0611 3.8828 11.0458C3.88979 11.0369 3.89715 11.0279 3.90469 11.0191C3.91826 11.0032 3.93213 10.9879 3.94646 10.973C3.9507 10.9686 3.95515 10.9641 3.95964 10.9596L10.6263 4.29289C11.0168 3.90237 11.65 3.90237 12.0405 4.29289Z" fill="#6D7885"/>
              </svg>
              <span>{{ $t('order') }}</span>
            </a>
            <div class="product-favourite" v-if="$store.getters.loggedIn && !my">
              <input type="checkbox" @change="handleLike(order)" :checked="order.is_favourite">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z"
                    stroke="#E64646" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
          <div class="product-container-content">
            <div class="sale-container">
              <div class="product-gallery">
                <LightGallery
                    v-if="order.images.length"
                    :images="order.images"
                    :index="index"
                    :disable-scroll="true"
                    @close="index = null"
                />
                <VueSlickCarousel
                    :arrows="false"
                    :infinite="false"
                    :slidesToScroll="1"
                    :speed="400"
                    :swipeToSlide="true"
                    :touchThreshold="10"
                    :variableWidth="true"
                    :waitForAnimate="false"
                >
                  <div class="gallery-item" v-for="(img, imgIdx) in order.images" :key="imgIdx">
                    <img :src="img.url" alt="">
                    <button class="btn-plain show-gallery" @click="index = imgIdx">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.17663 15.2008C1.94112 14.7643 1.94112 14.2348 2.17663 13.7983C5.01471 8.54963 10.2574 4 15.5 4C20.7426 4 25.9853 8.54963 28.8234 13.7998C29.0589 14.2363 29.0589 14.7658 28.8234 15.2023C25.9853 20.451 20.7426 25.0006 15.5 25.0006C10.2574 25.0006 5.01471 20.451 2.17663 15.2008Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.682 11.3182C20.4394 13.0756 20.4394 15.925 18.682 17.6824C16.9246 19.4398 14.0753 19.4398 12.3179 17.6824C10.5605 15.925 10.5605 13.0756 12.3179 11.3182C14.0753 9.56082 16.9246 9.56082 18.682 11.3182Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="sale-name">{{ order.title }}</div>
              <div class="sale-price">{{ order.price }}</div>
              <div class="sale-detail-list">
                <div class="sale-detail-item">
                  <div class="sale-detail-name">{{ $t('region') }}</div>
                  <div class="sale-detail-value">{{ order.region.title }}</div>
                </div>
                <div class="sale-detail-item">
                  <div class="sale-detail-name">{{ $t('address') }}</div>
                  <div class="sale-detail-value">{{ order.address }}</div>
                </div>
                <div class="sale-detail-item">
                  <div class="sale-detail-name">{{ $t('Working_hours') }}</div>
                  <div class="sale-detail-value">{{ order.type.title }}</div>
                </div>
                <div class="sale-detail-item">
                  <div class="sale-detail-name">{{ $t('date') }}</div>
                  <div class="sale-detail-value">{{ order.start_datetime | moment("DD.MM.YYYY HH:mm") }}</div>
                </div>
              </div>
<!--              <div class="sale-info">-->
<!--                <b>Комментарий продавца</b>-->
<!--                <p>{{ order.description }}</p>-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="product-sidebar">
        <div class="product-tools">
          <div class="product-tools-header"  v-if="!my">
            <p>{{ $t('customer') }}</p>
          </div>
          <div class="product-tools-body">
            <div class="owner-badge"  v-if="!my">
              <div class="owner-badge-img">
                <img src="@/assets/img/main/ava.png" alt="">
              </div>
              <div class="owner-badge-caption">
                <p>{{ order.author.name }}</p>
<!--                <span>{{ vehicle.created_at | moment("DD.MM.YYYY HH:mm") }}</span>-->
              </div>
            </div>
            <app-button class="show-phone" type="btn-success" size="btn-lg" @action="handleShowNumber"  v-if="!my">
              <a :href="`tel:${order.author.phone}`" v-if="isNumber">{{ order.author.phone }}</a>
              <template v-else>{{ $t('show_number') }}</template>
            </app-button>
            <router-link class="btn-plain order-control-btn" :to="{name: 'TheOrderEdit', params: {id: order.id}}"   v-if="my">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3043 2.75 17.863 2.75C18.421 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.571 21.275 6.113C21.2917 6.65433 21.1083 7.11667 20.725 7.5L19.3 8.925ZM4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.096 20.5207 3 20.2833 3 20V17.175C3 17.0417 3.025 16.9127 3.075 16.788C3.125 16.6627 3.2 16.55 3.3 16.45L13.6 6.15L17.85 10.4L7.55 20.7C7.45 20.8 7.33767 20.875 7.213 20.925C7.08767 20.975 6.95833 21 6.825 21H4Z" fill="#2787F5"/>
              </svg>
              <span>{{ $t('edit') }}</span>
            </router-link>
            <button class="btn-plain order-control-btn" v-if="my"   @click="remove(order.id)" >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1378 21H7.85782C6.81082 21 5.94082 20.192 5.86282 19.147L4.96582 7H18.9998L18.1328 19.142C18.0578 20.189 17.1868 21 16.1378 21V21Z" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 11V17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 7H20" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 7L15.987 4.298C15.694 3.517 14.948 3 14.114 3H9.886C9.052 3 8.306 3.517 8.013 4.298L7 7" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.4298 11L14.9998 17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.57016 11L9.00016 17" stroke="#FA7264" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ $t('remove') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import API from "@/api";
import { LightGallery } from 'vue-light-gallery';

export default {
  name: "TheOrderDetail",

  components: {
    AppButton,
    VueSlickCarousel,
    LightGallery
  },

  mounted() {
    this.fetchData()
  },

  data() {
    return {
      lightGallery: null,
      index: null,
      isNumber: false,
      order: {},
      my:this.$route.query.my
    }
  },

  watch: {
    index() {
      if(this.index == null) {
        document.getElementById('main').style.zIndex = '8';
      } else {
        document.getElementById('main').style.zIndex = '11';
      }
    }
  },

  methods: {
    fetchData() {
      const params = {
        id: this.$route.params.id
      };
      this.$store.commit('setSpinnerLoader', true);
      API.product.getOrder({params})
          .then((res) => {
            this.order = res.order;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
          });
    },
    handleShowNumber() {
      if(this.$store.getters.loggedIn) {
        this.isNumber = true
      } else {
        this.$notify({
          text: this.$t('need_to_authorize'),
        })
      }
    },
    handleLike(item){
      if(!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\Order");
        API.favorite.add(formData).then((res) => {
          console.log(res);
        });
      }else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\Order");
        API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
      }
    },
    remove(id){
      API.productAdd.removeOrder({ id: id}).then((res) => {
        if(res.success) {
          this.$router.push('/');
          this.$router.push({name: 'TheAdverts'})
        }
      })
    },
  }
}
</script>

<style scoped>
.show-phone a {
  color: #fff;
}
</style>
