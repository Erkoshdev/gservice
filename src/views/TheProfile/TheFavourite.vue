<template>
  <div class="page-wrapper favourite-page">
    <div class="internal-wrapper">
      <div class="internal-sidebar internal-sidebar-left">
        <app-profile-card> </app-profile-card>
        <app-sidebar-nav></app-sidebar-nav>
      </div>
      <div class="internal-content">
        <div class="internal-content-header">
          <b>{{ $t('favourite') }}</b>
          <ul class="tab">
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('vehicle')" :class="{active: activeTab === 'vehicle'}">{{ $t('specialequipment') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('order')" :class="{active: activeTab === 'order'}">{{ $t('orders') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('service')" :class="{active: activeTab === 'service'}">{{ $t('services') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('shop')" :class="{active: activeTab === 'shop'}">{{ $t('shop') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('repair')" :class="{active: activeTab === 'repair'}">{{ $t('remont') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('operator')" :class="{active: activeTab === 'operator'}">{{ $t('operator') }}</a>
            </li>
          </ul>
        </div>
        <div class="internal-content-body">
          <div class="favourite-container" :class="{empty: !favVehicles.length}" v-if="activeTab === 'vehicle'">
            <div class="favourite-card-list" v-if="favVehicles.length">
              <app-card
                  v-for="item in favVehicles"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favVehicles.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favVehicles.length" class="text-link-blue" :to="{name: 'TheFilterVehicle'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
          <div class="favourite-container" :class="{empty: !favOrders.length}" v-else-if="activeTab === 'order'">
            <div class="favourite-card-list" v-if="favOrders.length">
              <app-order-card
                  v-for="item in favOrders"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favOrders.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favOrders.length" class="text-link-blue" :to="{name: 'TheFilterOrder'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
          <div class="favourite-container" :class="{empty: !favServices.length}" v-else-if="activeTab === 'service'">
            <div class="favourite-card-list" v-if="favServices.length">
              <app-service-card
                  v-for="item in favServices"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favServices.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favServices.length" class="text-link-blue" :to="{name: 'TheFilterService'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
          <div class="favourite-container" :class="{empty: !favShops.length}" v-else-if="activeTab === 'shop'">
            <div class="favourite-card-list" v-if="favShops.length">
              <app-shop-card
                  v-for="item in favShops"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favShops.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favShops.length" class="text-link-blue" :to="{name: 'TheFilterShop'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
          <div class="favourite-container" :class="{empty: !favRepairs.length}" v-else-if="activeTab === 'repair'">
            <div class="favourite-card-list" v-if="favRepairs.length">
              <app-repair-card
                  v-for="item in favRepairs"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favRepairs.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favRepairs.length" class="text-link-blue" :to="{name: 'TheFilterRepair'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
          <div class="favourite-container" :class="{empty: !favOperators.length}" v-else>
            <div class="favourite-card-list" v-if="favOperators.length">
              <app-operator-card
                  v-for="item in favOperators"
                  :key="item.id"
                  :item="item"
                  @handleLike="handleLike"
              />
            </div>
            <app-empty-container
                v-if="!favOperators.length"
                img="heart-lg"
                :title="$t('do_not_have_favourite')"
                :text="$t('your_favourites_appear_here')"
            ></app-empty-container>
            <router-link v-if="!favOperators.length" class="text-link-blue" :to="{name: 'TheFilterOperator'}">{{ $t('go_to_catalog') }}</router-link>
          </div>
        </div>
      </div>
      <div class="internal-sidebar internal-sidebar-right">
        <app-advert-card></app-advert-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppProfileCard from "@/components/AppProfileCard";
import AppAdvertCard from "@/components/AppAdvertCard";
import AppSidebarNav from "@/components/AppSidebarNav";
import AppEmptyContainer from "@/components/AppEmptyContainer";
import API from "@/api";
import AppCard from "@/components/AppProductCards/AppCard";
import AppOrderCard from "@/components/AppProductCards/AppOrderCard";
import AppServiceCard from "@/components/AppProductCards/AppServiceCard";
import AppShopCard from "@/components/AppProductCards/AppShopCard";
import AppRepairCard from "@/components/AppProductCards/AppRepairCard";
import AppOperatorCard from "@/components/AppProductCards/AppOperatorCard";

export default {
  name: "TheFavourite",

  components: {
    AppEmptyContainer,
    AppProfileCard,
    AppAdvertCard,
    AppSidebarNav,
    AppCard,
    AppOrderCard,
    AppServiceCard,
    AppShopCard,
    AppRepairCard,
    AppOperatorCard,
  },

  data() {
    return {
      activeTab: 'vehicle',

      favVehicles: [],
      favOrders: [],
      favServices: [],
      favShops: [],
      favRepairs: [],
      favOperators: [],
    }
  },
  mounted() {
    this.fetchFavVehicle();
    this.fetchFavOrder();
    this.fetchFavService();
    this.fetchFavShop();
    this.fetchFavRepair();
    this.fetchFavOperator();
  },

  methods: {
    async handleLike(item, url) {
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("type", url);
      await API.favorite.remove(formData).then(() => {
        switch(url) {
          case 'App\\Models\\SaleVehicle':
            this.fetchFavVehicle();
            break;
          case 'App\\Models\\Order':
            this.fetchFavOrder();
            break;
          case 'App\\Models\\Vehicle':
            this.fetchFavService();
            break;
          case 'App\\Models\\ShopItem':
            this.fetchFavShop();
            break;
          case 'App\\Models\\Repairmen':
            this.fetchFavRepair();
            break;
          case 'App\\Models\\DriverApplication':
            this.fetchFavOperator();
            break;
        }
      });
    },

    changeTab(name) {
      this.activeTab = name
    },

    fetchFavVehicle() {
      const params = {
        type: 'App\\Models\\SaleVehicle'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favVehicles = res.favourites
      })
    },
    fetchFavOrder() {
      const params = {
        type: 'App\\Models\\Order'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favOrders = res.favourites
      })
    },
    fetchFavService() {
      const params = {
        type: 'App\\Models\\Vehicle'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favServices = res.favourites
      })
    },
    fetchFavShop() {
      const params = {
        type: 'App\\Models\\ShopItem'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favShops = res.favourites
      })
    },
    fetchFavRepair() {
      const params = {
        type: 'App\\Models\\Repairmen'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favRepairs = res.favourites
      })
    },
    fetchFavOperator() {
      const params = {
        type: 'App\\Models\\DriverApplication'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favOperators = res.favourites
      })
    },
  }
}
</script>

<style scoped>

</style>
