<template>
  <div class="card">
    <div class="card-caption">
      <div class="card-caption-primary">
        <div class="card-caption-primary-left">
          <div class="card-name">
            <router-link @click.native="$emit('link')" :to="{name: 'TheRepairDetail', params: {id: item.id}}">{{ name(item.profession) }}</router-link>
          </div>
          <div class="card-info-primary">{{$t('experience_single')}} {{ item.experience }}
            {{$i18n.locale === 'ru' ? 'лет' : $i18n.locale === 'en' ? 'year' : 'жыл'}}
          </div>
          <div class="card-info-secondary">{{ item.user.name }}</div>
        </div>
        <div class="card-caption-primary-right">
          <div class="card-tools" v-if="$store.getters.loggedIn">
            <div class="card-favorite">
              <input type="checkbox" @change="$emit('handleLike', item, 'App\\Models\\Repairmen')" :checked="item.is_favourite">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.47401 4.41385L7.99617 4.91993L8.51815 4.41366L8.59124 4.34277C9.22036 3.75539 9.91735 3.45588 10.6863 3.42025L10.8515 3.41664C12.5414 3.42082 13.9166 4.79316 13.9166 6.47811C13.9166 7.34995 13.7712 7.92848 13.3271 8.56885C12.8461 9.26246 11.999 10.0521 10.4838 11.2657C10.4833 11.2661 10.4829 11.2665 10.4824 11.2669L9.86567 11.7557L8.29197 12.9822L8.75301 13.5738L8.29197 12.9822C8.12037 13.116 7.87985 13.116 7.70819 12.9824C7.70812 12.9823 7.70805 12.9823 7.70799 12.9822L5.9199 11.5868C5.91931 11.5864 5.91872 11.5859 5.91813 11.5854C4.2258 10.2482 3.27601 9.39713 2.73604 8.6577C2.23946 7.97769 2.08331 7.38339 2.08331 6.47811C2.08331 4.79058 3.46273 3.41663 5.15623 3.41663C5.97419 3.41663 6.7197 3.71519 7.39937 4.34151L7.47401 4.41385Z" stroke="#99A2AD" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="card-caption-secondary">
        <ul class="card-additional">
          <li>{{ item.region.title }}</li>
          <li>{{ item.created_at }}</li>
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

export default {
  name: "AppRepairCard",

  components: {
    AppButton
  },

  data() {
    return {
      isNumber: false
    }
  },

  props: {
    item: Object,
  },

  methods: {
    name(arr) {
      return arr.map(item => {
        return item.title
      }).join(', ')
    },
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
