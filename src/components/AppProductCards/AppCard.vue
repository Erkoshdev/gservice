<template>
  <div class="card">
    <div class="card-img">
      <img v-if="item && item.images" :src="item.images[0].url" alt="">
      <router-link @click.native="$emit('link')" class="absolute-link" :to="{name: 'TheVehicleDetail', params: {id: item.id}}"></router-link>
    </div>
    <div class="card-caption">
      <div class="card-caption-primary">
        <div class="card-caption-primary-left">
          <div class="card-name">
            <router-link @click.native="$emit('link')" :to="{name: 'TheVehicleDetail', params: {id: item.id}}">{{ item.mark.title }} {{ item.model }}</router-link>
          </div>
          <div class="card-info-primary">{{ item.type.title }}</div>
          <div class="card-info-secondary">{{ item.fuel.title }}</div>
        </div>
        <div class="card-caption-primary-right">
          <div class="card-price">{{ item.price | vMask(priceMask) }} ₸</div>
          <div class="card-tools" v-if="$store.getters.loggedIn">
            <div class="card-favorite">
              <input type="checkbox" @change="$emit('handleLike',item, 'App\\Models\\SaleVehicle')" :checked="item.is_favourite">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.47401 4.41385L7.99617 4.91993L8.51815 4.41366L8.59124 4.34277C9.22036 3.75539 9.91735 3.45588 10.6863 3.42025L10.8515 3.41664C12.5414 3.42082 13.9166 4.79316 13.9166 6.47811C13.9166 7.34995 13.7712 7.92848 13.3271 8.56885C12.8461 9.26246 11.999 10.0521 10.4838 11.2657C10.4833 11.2661 10.4829 11.2665 10.4824 11.2669L9.86567 11.7557L8.29197 12.9822L8.75301 13.5738L8.29197 12.9822C8.12037 13.116 7.87985 13.116 7.70819 12.9824C7.70812 12.9823 7.70805 12.9823 7.70799 12.9822L5.9199 11.5868C5.91931 11.5864 5.91872 11.5859 5.91813 11.5854C4.2258 10.2482 3.27601 9.39713 2.73604 8.6577C2.23946 7.97769 2.08331 7.38339 2.08331 6.47811C2.08331 4.79058 3.46273 3.41663 5.15623 3.41663C5.97419 3.41663 6.7197 3.71519 7.39937 4.34151L7.47401 4.41385Z" stroke="#99A2AD" stroke-width="1.5"/>
              </svg>
            </div>
            <button class="btn-plain card-edit" v-if="hasEdit">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33333 12.6668H4.26667L10.0167 6.91683L9.08333 5.9835L3.33333 11.7335V12.6668ZM12.8667 5.95016L10.0333 3.15016L10.9667 2.21683C11.2222 1.96127 11.5362 1.8335 11.9087 1.8335C12.2807 1.8335 12.5944 1.96127 12.85 2.21683L13.7833 3.15016C14.0389 3.40572 14.1722 3.71416 14.1833 4.0755C14.1944 4.43638 14.0722 4.74461 13.8167 5.00016L12.8667 5.95016ZM2.66667 14.0002C2.47778 14.0002 2.31956 13.9362 2.192 13.8082C2.064 13.6806 2 13.5224 2 13.3335V11.4502C2 11.3613 2.01667 11.2753 2.05 11.1922C2.08333 11.1086 2.13333 11.0335 2.2 10.9668L9.06667 4.10016L11.9 6.9335L5.03333 13.8002C4.96667 13.8668 4.89178 13.9168 4.80867 13.9502C4.72511 13.9835 4.63889 14.0002 4.55 14.0002H2.66667Z" fill="#99A2AD"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="card-caption-secondary">
        <ul class="card-additional">
          <li>{{ item.region.title }}</li>
          <li>{{ item.created_at | moment("DD.MM.YYYY") }}</li>
        </ul>
        <app-button type="btn-success" size="btn-sm" @action="handleShowNumber">
          <a :href="`tel:${item.user.phone}`" v-if="isNumber">{{ item.user.phone }}</a>
          <template v-else>{{ $t('show_number') }}</template>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const priceMask = createNumberMask({
  includeThousandsSeparator: true,
  prefix: '',
  thousandsSeparatorSymbol: ' ',
});

export default {
  name: "AppCard",

  components: {
    AppButton
  },

  data() {
    return {
      isNumber: false,
      priceMask,
    }
  },

  props: {
    item: Object,
    hasEdit: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleShowNumber() {
      if(this.$store.getters.loggedIn) {
        this.isNumber = true
      } else {
        this.$notify({
          text: this.$t('need_to_authorize'),
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
