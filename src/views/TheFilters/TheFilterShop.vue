<template>
  <div class="page-wrapper filter-page">
    <ul class="filter-nav">
      <li v-for="(filter, filterIdx) in filterNav" :key="filterIdx">
        <router-link
            class="filter-nav-link"
            :class="{active: isActive(filter.name)}"
            :to="{name: filter.name}"
        >
          <span class="filter-nav-link-img" :class="{'not-icon': !filter.isIcon}">
            <img :src="filter.img" alt="">
          </span>
          <span class="filter-nav-link-name">{{ $t(filter.title) }}</span>
        </router-link>
      </li>
    </ul>
    <div class="article-wrapper">
      <div class="article-main">
        <div class="filter-set">
          <div class="filter-primary">
            <ul class="filter-category-list">
              <li class="filter-category-item" v-for="(item, itemIdx) in categories" :key="itemIdx">
                <input type="checkbox" :value="item.id" v-model="filterParams.category_id" @change="uniqueCheck">
                <span class="filter-category-name">{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="filter-secondary">
            <div class="form-half">
              <app-select-base
                  :options="marks"
                  label-name="title"
                  :reduce="mark => mark.id"
                  v-model="filterParams.mark_id"
                  :placeholder="$t('equipment_mark')"
              ></app-select-base>
              <app-select-base
                  :options="regions"
                  label-name="title"
                  :reduce="region => region.id"
                  v-model="filterParams.region_id"
                  :placeholder="$t('all_regions')"
              ></app-select-base>
              <app-select-base
                  :options="countries"
                  label-name="title"
                  :reduce="country => country.id"
                  v-model="filterParams.country_id"
                  :placeholder="$t('production')"
              ></app-select-base>
              <app-input-base
                  type="text"
                  :placeholder="$t('Part_item_number')"
                  v-model="filterParams.part_number"
              ></app-input-base>
              <div class="form-half form-half-together">
                <app-input-base
                    type="number"
                    :placeholder="$t('price_from')"
                    v-model="filterParams.price_from"
                ></app-input-base>
                <app-input-base
                    type="number"
                    :placeholder="$t('price_to')"
                    v-model="filterParams.price_to"
                ></app-input-base>
              </div>
            </div>
            <div class="filter-tools">
              <app-button type="btn-success" size="btn-md" @action="clearFilter">{{ $t('clear') }}</app-button>
              <app-button type="btn-warning" size="btn-md" @action="getShop">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-shop-card
              v-for="(item, itemIdx) in products"
              :key="itemIdx"
              :item="item"
              @handleLike="handleLike"
          />
          <app-empty-container
              v-if="!products.length"
              img="order-lg"
              :title="$t('nothing_found')"
              :text="$t('not_adverts_in_category')"
          />
          <button class="text-link load-more-btn" v-if="hasNext" @click="loadMore">{{ $t('load_more') }}</button>
        </div>
      </div>
      <div class="article-sidebar">
        <app-advert-card></app-advert-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppInputBase from "@/components/AppForms/AppInputBase";
import AppSelectBase from "@/components/AppForms/AppSelectBase";
import AppAdvertCard from "@/components/AppAdvertCard";
import AppButton from "@/components/AppButton";
import API from "@/api";
import filterNav from "@/jsons/filterNav";
import AppShopCard from "@/components/AppProductCards/AppShopCard";
import AppEmptyContainer from "@/components/AppEmptyContainer";


function initialFilterParams() {
  return {
    category_id: [],
    region_id: null,
    country_id: null,
    mark_id: null,
    price_from: null,
    price_to: null,
    part_number: null,
    page: 1,
  }
}

export default {
  name: "TheFilterShop",

  components: {
    AppShopCard,
    AppInputBase,
    AppSelectBase,
    AppAdvertCard,
    AppButton,
    AppEmptyContainer
  },

  created() {
    this.getShopCategories();
    this.getMarks();
    this.getRegions();
    this.getCountries();
    this.getShop()
  },

  data() {
    return {
      filterNav: filterNav,
      categories: [],
      marks: [],
      regions: [],
      countries: [],
      partNumber: [],
      products: [],
      filterParams: initialFilterParams(),
      hasNext: '',
      total: 0,
    }
  },

  methods: {
    clearFilter() {
      this.filterParams = initialFilterParams();
      this.getShop()
    },
    uniqueCheck(e) {
      this.filterParams.category_id = [];
      if(e.target.checked) {
        this.filterParams.category_id.push(e.target.value)
      }
    },
    async handleLike(item){
      if(!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\ShopItem");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getShop();
      }else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\ShopItem");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getShop();
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
    },
    getShopCategories() {
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getShopCategories()
          .then((res) => {
            this.categories = res.categories;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
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
    getCountries() {
      API.filter.getCountries()
          .then((res) => {
            this.countries = res.countries
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    },
    getShop() {
      this.products = [];
      this.filterParams.page = 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getShop({params})
          .then((res) => {
            this.products = res.items.data;
            this.total = res.items.total;
            this.hasNext = res.items.next_page_url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
          });
    },
    loadMore(){
      this.filterParams.page += 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getShop({params})
          .then((res) => {
            this.products = this.products.concat(res.items.data);
            this.hasNext = res.items.next_page_url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
          });
    },
  }
}
</script>

<style scoped>

</style>
