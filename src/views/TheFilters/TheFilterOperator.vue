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
                  :reduce="region => region.id"
                  v-model="filterParams.region_id"
                  :placeholder="$t('all_regions')"
              ></app-select-base>
            </div>
            <div class="filter-tools">
              <app-button type="btn-success" size="btn-md" @action="clearFilter">{{ $t('clear') }}</app-button>
              <app-button type="btn-warning" size="btn-md" @action="getOperators">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-operator-card
            v-for="(item, itemIdx) in operators"
            :key="itemIdx"
            :item="item"
            @handleLike="handleLike"
          />
          <app-empty-container
              v-if="!operators.length"
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
import AppSelectBase from "@/components/AppForms/AppSelectBase";
import AppButton from "@/components/AppButton";
import AppAdvertCard from "@/components/AppAdvertCard";
import API from "@/api";
import filterNav from "@/jsons/filterNav";
import AppOperatorCard from "@/components/AppProductCards/AppOperatorCard";
import AppEmptyContainer from "@/components/AppEmptyContainer";

function initialFilterParams() {
  return {
    mark_id: null,
    region_id: null,
    page: 1,
  }
}

export default {
  name: "TheFilterOperator",

  components: {
    AppEmptyContainer,
    AppSelectBase,
    AppButton,
    AppAdvertCard,
    AppOperatorCard
  },

  created() {
    this.getMarks();
    this.getRegions();
    this.getOperators();
  },

  data() {
    return {
      filterNav: filterNav,
      filterParams: initialFilterParams(),
      marks: [],
      regions: [],
      operators: [],
      hasNext: '',
      total: 0,
    }
  },

  methods: {
    clearFilter() {
      this.filterParams = initialFilterParams();
      this.getOperators();
    },
    async handleLike(item){
      if(!item.is_favourite) {
        /* eslint-disable-next-line */
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\DriverApplication");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getOperators()
      } else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\DriverApplication");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getOperators()
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
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
    getOperators() {
      this.operators = [];
      this.filterParams.page = 1;
      const params = this.filterParams;
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getOperators({ params })
          .then((res) => {
            this.operators = res.driver_applications.data;
            this.total = res.driver_applications.total;
            this.hasNext = res.driver_applications.next_page_url;
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
      API.filter.getOperators({ params })
          .then((res) => {
            this.operators = this.operators.concat(res.driver_applications.data);
            this.hasNext = res.driver_applications.next_page_url;
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
