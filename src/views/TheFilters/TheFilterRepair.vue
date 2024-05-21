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
              <li class="filter-category-item" v-for="(item, itemIdx) in professions" :key="itemIdx">
                <input type="checkbox" :value="item.id" v-model="filterParams.profession_id" @change="uniqueCheck">
                <span class="filter-category-name">{{ item.title }}</span>
              </li>
            </ul>
          </div>
          <div class="filter-secondary">
            <div class="form-half">
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
              <app-button type="btn-warning" size="btn-md" @action="getRepairs">{{ $t('show') }} {{ total }} {{ $t('adverts') }}</app-button>
            </div>
          </div>
        </div>
        <div class="card-list">
          <app-repair-card
              v-for="(item, itemIdx) in repairs"
              :key="itemIdx"
              :item="item"
              @handleLike="handleLike"
          />
          <app-empty-container
              v-if="!repairs.length"
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
import AppAdvertCard from "@/components/AppAdvertCard";
import AppButton from "@/components/AppButton";
import AppRepairCard from "@/components/AppProductCards/AppRepairCard";
import API from "@/api";
import filterNav from "@/jsons/filterNav";
import AppEmptyContainer from "@/components/AppEmptyContainer";

function initialFilterParams (){
  return {
    region_id: null,
    profession_id: [],
    page: 1,
  }
}

export default {
  name: "TheFilterRepair",

  components: {
    AppSelectBase,
    AppAdvertCard,
    AppButton,
    AppRepairCard,
    AppEmptyContainer
  },

  created() {
    this.getProfessions();
    this.getRegions();
    this.getRepairs();
  },

  data() {
    return {
      filterNav: filterNav,
      professions: [],
      regions: [],
      filterParams: initialFilterParams(),
      repairs: [],
      hasNext: '',
      total: 0,
    }
  },

  methods: {
    clearFilter() {
      this.filterParams = initialFilterParams();
      this.getRepairs()
    },
    uniqueCheck(e) {
      this.filterParams.profession_id = [];
      if(e.target.checked) {
        this.filterParams.profession_id.push(e.target.value)
      }
    },
    async handleLike(item){
      if(!item.is_favourite) {
        const formData = new FormData();
        formData.append("favouritable_id", item.id);
        formData.append("favouritable_type", "App\\Models\\Repairmen");
        await API.favorite.add(formData).then((res) => {
          console.log(res);
        });
        this.getRepairs();
      }else{
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("type", "App\\Models\\Repairmen");
        await API.favorite.remove(formData).then((res) => {
          console.log(res);
        });
        this.getRepairs();
      }
    },
    isActive(name) {
      return name && this.$route.name.includes(name)
    },
    getProfessions() {
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getProfessions()
          .then((res) => {
            this.professions = res.professions
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
    getRepairs() {
      this.repairs = [];
      this.filterParams.page = 1;
      const params = this.filterParams
      this.$store.commit('setSpinnerLoader', true);
      API.filter.getRepairs({ params })
          .then((res) => {
            this.repairs = res.repairmens.data;
            this.total = res.repairmens.total;
            this.hasNext = res.repairmens.next_page_url;
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
      API.filter.getRepairs({ params })
          .then((res) => {
            this.repairs = this.repairs.concat(res.repairmens.data);
            this.hasNext = res.repairmens.next_page_url;
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
