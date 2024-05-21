<template>
  <div class="footer">
    <div class="container">
      <div class="footer-row">
        <ul class="footer-social">
          <li v-for="(item, itemIdx) in socialList" :key="itemIdx">
            <a :href="item.link" target="_blank">
              <img :src="item.icon" alt="">
            </a>
          </li>
        </ul>
        <ul class="footer-app">
          <li>
            <a href="https://apps.apple.com/kz/app/gservice/id1627674303" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0443 6.30715L16.3193 6.31631C17.1115 6.34523 17.8863 6.55724 18.5828 6.93573C19.2794 7.31421 19.8788 7.84889 20.3341 8.49783C20.2424 8.562 17.9325 9.90024 17.96 12.6867C17.9967 16.014 20.884 17.1231 20.9115 17.1414C20.8932 17.2148 20.4532 18.718 19.39 20.2671C18.4733 21.6053 17.5201 22.9435 16.026 22.971C14.5594 22.9985 14.0736 22.0911 12.3963 22.0911C10.7097 22.0911 10.1781 22.9435 8.78483 22.9985C7.34575 23.0535 6.23666 21.5503 5.32006 20.2121C3.42268 17.4806 1.98361 12.4942 3.91765 9.12113C4.37345 8.30718 5.03304 7.62573 5.83169 7.14365C6.63034 6.66156 7.54062 6.39541 8.47318 6.37131C9.89392 6.34381 11.2322 7.32458 12.1029 7.32458C12.9737 7.32458 14.6053 6.14216 16.3193 6.31631L16.0443 6.30715ZM16.3377 1C16.4327 2.2754 16.021 3.53684 15.1919 4.5106C14.8039 5.00319 14.3078 5.39993 13.742 5.67013C13.1762 5.94032 12.5558 6.07674 11.9288 6.06883C11.8852 5.45294 11.9658 4.83457 12.1658 4.25042C12.3658 3.66626 12.681 3.12822 13.0929 2.66822C13.9214 1.71777 15.0826 1.1208 16.3377 1V1Z" fill="#99A2AD"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.gservice&pli=1" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.76058 3.22455L15.4502 8.41211L12.4936 11.3687L4.23848 3.1135C4.71105 2.94121 5.25704 2.95499 5.76058 3.22455Z" fill="#99A2AD"/>
                <path d="M16.2726 8.85238L19.0637 10.3466C20.384 11.0535 20.384 12.9464 19.0637 13.6533L16.2726 15.1476L13.125 12L16.2726 8.85238Z" fill="#99A2AD"/>
                <path d="M3.48267 3.62039C3.18661 3.94579 3 4.38019 3 4.87791V19.1221C3 19.6198 3.18661 20.0543 3.48264 20.3797L11.8623 12L3.48267 3.62039Z" fill="#99A2AD"/>
                <path d="M5.76058 20.7755C5.25704 21.0451 4.71101 21.0588 4.23848 20.8865L12.4937 12.6313L15.4502 15.5879L5.76058 20.7755Z" fill="#99A2AD"/>
              </svg>
            </a>
          </li>
        </ul>
        <ul class="footer-nav">
          <li>
            <router-link class="footer-nav-link" to="/">{{ $t('about_company') }}</router-link>
          </li>
          <li>
            <router-link class="footer-nav-link" to="/">{{ $t('faq') }}</router-link>
          </li>
          <li>
            <router-link class="footer-nav-link" to="/">{{ $t('contacts') }}</router-link>
          </li>
          <li>
            <router-link class="footer-nav-link" to="/">{{ $t('terms_of_use') }}</router-link>
          </li>
        </ul>
        <div class="copyright">© 2023 ООО «G-Service»</div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";

export default {
  name: "TheFooter",

  created() {
    this.fetchMedia()
  },

  data() {
    return {
      socialList: [
        {
          icon: require('@/assets/img/icon/facebook.svg'),
          name: 'facebook'
        },
        {
          icon: require('@/assets/img/icon/insta.svg'),
          name: 'instagram',
        },
        {
          icon: require('@/assets/img/icon/telegram.svg'),
          name: 'telegram',
        },
        {
          icon: require('@/assets/img/icon/whatsapp.svg'),
          name: 'whatsapp',
        },
        {
          icon: require('@/assets/img/icon/youtube.png'),
          name: 'youtube',
        }
      ]
    }
  },

  methods: {
    fetchMedia() {
      API.social.getList()
          .then((res) => {
            this.socialList = this.socialList.map((item, i) => {
              if(item.name === res.links[i].code) {
                return Object.assign({}, item, res.links[i])
              }
            });
            this.socialList = this.socialList.splice(1)
          })
          .catch((error) => {
            console.log(error);
          })

    },
  }
}
</script>

<style scoped>

</style>
