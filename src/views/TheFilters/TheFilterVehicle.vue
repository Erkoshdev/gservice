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
                <input type="checkbox" :value="type.id" v-model="filterParams.vehicle_type_id" @change="uniqueCheck">
                <span class="filter-category-name">{{ type.title }}</span>
              </li>
              <template v-if="isMore">
                <li class="filter-category-item" v-for="type in vehiclesMore" :key="type.id">
                  <input type="checkbox" :value="type.id" v-model="filterParams.vehicle_type_id" @change="uniqueCheck">
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
              <app-select-base
                  :options="marks"
                  label-name="title"
                  v-model="filterParams.mark_id"
                  :reduce="mark => mark.id"
                  :placeholder="$t('equipment_mark')"
              ></app-select-base>
              <app-select-base
                  :options="regions"
                  label-name="title"
                  v-model="filterParams.region_id"
                  :reduce="region => region.id"
                  :placeholder="$t('all_regions')"
              ></app-select-base>
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
              <div class="form-half form-half-together">
                <app-datepicker
                    class="test"
                    type-date-picker="year"
                    :placeholder="$t('year_from')"
                    :clearable="true"
                    :is-disabled="true"
                    format="YYYY"
                    v-model="filterParams.year_from"
                />
                <app-datepicker
                    type-date-picker="year"
                    :placeholder="$t('year_to')"
                    :clearable="true"
                    :is-disabled="true"
                    format="YYYY"
                    v-model="filterParams.year_to"
                />
              </div>
            </div>
            <div class="filter-tools">
              <app-button type="btn-success" size="btn-md" @action="clearFilter">{{ $t('clear') }}</app-button>
              <app-button type="btn-warning" size="btn-md" @action="getProducts">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-card
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
import AppCard from "@/components/AppProductCards/AppCard";
import API from "@/api";
import filterNav from "@/jsons/filterNav";
import AppDatepicker from "@/components/AppForms/AppDatepicker";
import AppEmptyContainer from "@/components/AppEmptyContainer";

function initialFilterParams() {
  return {
    vehicle_type_id: [],
    region_id: null,
    mark_id: null,
    price_from: null,
    price_to: null,
    year_from: null,
    year_to: null,
    defaultDate:null,
    page: 1,
  }
}

export default {
  name: "TheFilterVehicle",

  components: {
    AppInputBase,
    AppSelectBase,
    AppAdvertCard,
    AppButton,
    AppCard,
    AppDatepicker,
    AppEmptyContainer
  },

  created() {
    this.getVehicles();
    this.getMarks();
    this.getRegions();
    this.getProducts();
  },

  data() {
    return {
      filterNav: filterNav,
      vehicles: [],
      vehiclesMore: [],
      marks: [],
      regions: [],
      products: [],
      isMore: false,
      filterParams: initialFilterParams(),
      hasNext: '',
      total: 0,
    }
  },

  methods: {
    clearFilter() {
      window.location.reload();
      this.filterParams = initialFilterParams();
      this.getProducts();
    },
    uniqueCheck(e) {
      this.filterParams.vehicle_type_id = [];
      if (e.target.checked) {
        this.filterParams.vehicle_type_id.push(e.target.value)
      }
    },
    async handleLike(item) {
      if (!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\SaleVehicle");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getProducts();
      } else {
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\SaleVehicle");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getProducts();
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
    },
    // async handleLike(item,index){
    //   const oldVal = this.vehicles[index].is_liked;
    //   this.posts[index].is_liked = !this.posts[index].is_liked;
    //   API.filter.getVehicles().then((res) => {
    //     this.vehicles = res.fuel_types.slice(0, 15);
    //     this.vehiclesMore = res.fuel_types.slice(15);
    //   });

    // },
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
    getMarks() {
      API.filter.getMarks()
          .then((res) => {
            this.marks = res.marks
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
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
    getProducts() {
      this.products = [];
      this.filterParams.page = 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getProducts({params})
          .then((res) => {
            this.products = res.sale_vehicles.data;
            this.total = res.sale_vehicles.total;
            this.hasNext = res.sale_vehicles.next_page_url;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit('setSpinnerLoader', false);
          });
    },
    loadMore() {
      this.filterParams.page += 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getProducts({params})
          .then((res) => {
            this.products = this.products.concat(res.sale_vehicles.data);
            this.hasNext = res.sale_vehicles.next_page_url;
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
