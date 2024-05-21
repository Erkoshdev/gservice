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
              <li class="filter-category-item" v-for="type in vehicles" :key="type.id">
                <input type="checkbox" :value="type.id" v-model="filterParams.type_id" @change="uniqueCheck">
                <span class="filter-category-name">{{ type.title }}</span>
              </li>
              <template v-if="isMore">
                <li class="filter-category-item" v-for="type in vehiclesMore" :key="type.id">
                  <input type="checkbox" :value="type.id" v-model="filterParams.type_id" @change="uniqueCheck">
                  <span class="filter-category-name">{{ type.title }}</span>
                </li>
              </template>
              <li class="filter-category-item" v-if="vehiclesMore.length">
                <button
                    class="filter-category-name show-more-category"
                    :class="{active: isMore}"
                    @click="isMore = !isMore"
                >
                  {{ isMore ? $t('hide') : $t('show_more') }}
                </button>
              </li>
            </ul>
          </div>
          <div class="filter-secondary">
            <div class="form-half">
              <app-input-base
                  type="text"
                  :placeholder="$t('search_by_keyword')"
                  v-model="filterParams.model"
              ></app-input-base>
              <app-select-base
                  :options="regions"
                  label-name="title"
                  v-model="filterParams.region_id"
                  :reduce="region => region.id"
                  :placeholder="$t('all_regions')"
              ></app-select-base>
            </div>
            <div class="filter-tools">
              <app-button type="btn-success" size="btn-md" @action="clearFilter">{{ $t('clear') }}</app-button>
              <app-button type="btn-warning" size="btn-md" @action="getServices">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-service-card
            v-for="(item, itemIdx) in services"
            :key="itemIdx"
            :item="item"
            @handleLike="handleLike"
          />
          <app-empty-container
              v-if="!services.length"
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
import AppServiceCard from "@/components/AppProductCards/AppServiceCard";
import AppEmptyContainer from "@/components/AppEmptyContainer";

function initialFilterParams (){
  return {
    type_id: [],
    model: null,
    region_id: null,
    page: 1,
  }
}

export default {
  name: "TheFilterService",

  components: {
    AppServiceCard,
    AppInputBase,
    AppSelectBase,
    AppAdvertCard,
    AppButton,
    AppEmptyContainer
  },

  created() {
    this.getVehicles();
    this.getRegions();
    this.getServices();
  },

  data() {
    return {
      filterNav: filterNav,
      vehicles: [],
      vehiclesMore: [],
      regions: [],
      services: [],
      isMore: false,
      filterParams: initialFilterParams(),
      hasNext: '',
      total: 0,
    }
  },

  methods: {
    clearFilter() {
      this.filterParams = initialFilterParams();
      this.getServices()
    },
    uniqueCheck(e) {
      this.filterParams.type_id = [];
      if(e.target.checked) {
        this.filterParams.type_id.push(e.target.value)
      }
    },
    async handleLike(item){
      if(!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\Vehicle");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getServices();
      }else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\Vehicle");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getServices();
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
    },
    getVehicles() {
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getVehicles()
          .then((res) => {
            this.vehicles = res.fuel_types.slice(0, 15);
            this.vehiclesMore = res.fuel_types.slice(15);
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
            this.regions = res.regions;

          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    },
    getServices() {
      this.services = [];
      this.filterParams.page = 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getServices({ params })
          .then((res) => {
            this.services = res.vehicles.data;
            this.total = res.vehicles.total;
            this.hasNext = res.vehicles.next_page_url;
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
      API.filter.getServices({ params })
          .then((res) => {
            this.services = this.services.concat(res.vehicles.data);
            this.hasNext = res.vehicles.next_page_url;
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
