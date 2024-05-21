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
              <li class="filter-category-item" v-for="(item, itemIdx) in orderTypes" :key="itemIdx">
                <input type="checkbox" :value="item.code" v-model="type" @change="uniqueCheck">
                <span class="filter-category-name">{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="filter-secondary">
            <div class="form-half">
              <app-input-base
                  type="text"
                  :placeholder="$t('search_by_keyword')"
                  v-model="filterParams.title"
              ></app-input-base>
              <app-select-base
                  :options="regions"
                  label-name="title"
                  :reduce="region => region.id"
                  v-model="filterParams.region_id"
                  :placeholder="$t('all_regions')"
              ></app-select-base>
            </div>
            <div class="filter-tools">
              <app-button type="btn-success" size="btn-md" @action="clearFilter">{{ $t('clear') }}</app-button>
              <app-button type="btn-warning" size="btn-md" @action="getOrders">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-order-card
            v-for="(item, itemIdx) in orders"
            :key="itemIdx"
            :item="item"
            @handleLike="handleLike"
          />
          <app-empty-container
              v-if="!orders.length"
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
import AppButton from "@/components/AppButton";
import AppAdvertCard from "@/components/AppAdvertCard";
import API from "@/api";
import filterNav from "@/jsons/filterNav";
import AppOrderCard from "@/components/AppProductCards/AppOrderCard";
import AppEmptyContainer from "@/components/AppEmptyContainer";

function initialFilterParams() {
  return {
    title: '',
    region_id: null,
    page: 1,
  }
}

export default {
  name: "TheFilterOrder",

  components: {
    AppOrderCard,
    AppInputBase,
    AppSelectBase,
    AppButton,
    AppAdvertCard,
    AppEmptyContainer
  },

  created() {
    this.getOrderTypes();
    this.getRegions();
    this.getOrders();
  },

  data() {
    return {
      filterNav: filterNav,
      filterParams: initialFilterParams(),
      orderTypes: [],
      regions: [],
      orders: [],
      hasNext: '',
      total: 0,
      type: [],
    }
  },

  methods: {
    clearFilter() {
      this.filterParams = initialFilterParams();
      this.getOrders();
    },
    uniqueCheck(e) {
      this.type = [];
      if(e.target.checked) {
        this.type.push(e.target.value)
      }
    },
    async handleLike(item){
      if(!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\Order");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getOrders();
      }else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\Order");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getOrders();
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
    },
    getOrderTypes() {
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getOrderTypes()
          .then((res) => {
            this.orderTypes = res.order_types;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
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
    getOrders() {
      this.orders = [];
      this.filterParams.type = this.type[0]
      this.filterParams.page = 1;
      const params = this.filterParams
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getOrders({params})
          .then((res) => {
            this.orders = res.orders.data;
            this.total = res.orders.total;
            this.hasNext = res.orders.next_page_url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit("setSpinnerLoader", false);
          });
    },
    loadMore(){
      this.filterParams.page += 1;
      const params = this.filterParams
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getOrders({params})
          .then((res) => {
            this.orders = this.orders.concat(res.orders.data);
            this.hasNext = res.orders.next_page_url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit("setSpinnerLoader", false);
          });
    },

  }
}
</script>

<style scoped>

</style>
