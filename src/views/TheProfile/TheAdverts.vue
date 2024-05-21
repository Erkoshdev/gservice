<template>
  <div class="page-wrapper order-page">
    <div class="internal-wrapper">
      <div class="internal-sidebar internal-sidebar-left">
        <app-profile-card> </app-profile-card>
        <app-sidebar-nav></app-sidebar-nav>
      </div>
      <div class="internal-content">
        <div class="internal-content-header">
          <b>{{ $t('my_adverts') }}</b>
          <ul class="tab">
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('vehicle')" :class="{active: activeTab === 'vehicle'}">{{ $t('specialequipment') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('order')" :class="{active: activeTab === 'order'}">{{ $t('orders') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('repairs')" :class="{active: activeTab === 'repairs'}">{{ $t('remont') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('shop')" :class="{active: activeTab === 'shop'}">{{ $t('shop') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('service')" :class="{active: activeTab === 'service'}">{{ $t('services') }}</a>
            </li>
            <li class="tab-item">
              <a class="tab-link" @click="changeTab('operator')" :class="{active: activeTab === 'operator'}">{{ $t('operator') }}</a>
            </li>
          </ul>
        </div>
        <div class="internal-content-body">
          <div class="favourite-container" :class="{empty: !vehicles.length}" v-if="activeTab === 'vehicle'">
            <app-empty-container
                img="order-lg"
                :title="$t('lack_equipment')"
                :text="$t('lack_active_advert')"
                v-if="!vehicles.length"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div class="card"
                v-for="(item, itemIdx) in vehicles"
                :key="itemIdx"
                :item="item"
                >
                <div class="card-img">
                  <img v-if="item && item.images.length" :src="item?.images[0].url" alt="">
                  <router-link class="absolute-link"  :to="{name: 'TheVehicleDetail', params: {id: item.id}, query: { my: true } }"></router-link>
                </div>
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <router-link :to="{name: 'TheVehicleDetail', params: {id: item.id}, query: { my: true } }">{{ item.mark.title }} {{ item.model }}</router-link>
                      </div>
                      <div class="card-info-primary">{{ item.type.title }}</div>
                      <div class="card-info-secondary">{{ item.fuel.title }}</div>
                    </div>
                    <div class="card-caption-primary-right">
                      <div class="card-price">{{ item.price }} ₸</div>
                    </div>
                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">
                      <li>{{ item.region.title }}</li>
                      <li>{{ item.created_at | moment("DD.MM.YYYY") }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favourite-container" :class="{empty: !orders.length}" v-else-if="activeTab === 'order'">
            <app-empty-container
                img="order-lg"
                :title="$t('lack_orders')"
                :text="$t('lack_active_advert')"
                v-if="!orders.length"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div
                  class="card"
                  v-for="(item, itemIdx) in orders"
                  :key="itemIdx"
                  :item="item"
              >
                <div class="card-img">
                  <img v-if="item && item.images.length" :src="item?.images[0].url" alt="">
                  <router-link class="absolute-link" :to="{name: 'TheOrderDetail', params: {id: item.id}, query: { my: true }}"></router-link>
                </div>
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <router-link :to="{name: 'TheOrderDetail', params: {id: item.id}, query: {my: true}}">{{ item.title }}</router-link>
                      </div>
                      <ul class="card-info-primary-meta">
                        <li>{{ item.type.title }}</li>
                        <li>{{ item.start_datetime | moment("DD.MM.YYYY") }}</li>
                      </ul>
                      <div class="card-info-secondary">{{ item.address }}</div>
                    </div>
                    <div class="card-caption-primary-right">
                      <div class="card-price">{{ item.price }}</div>
                    </div>
                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">
                      <li>{{ item.region.title }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favourite-container" :class="{empty: !repair.length}" v-else-if="activeTab === 'repairs'">
            <app-empty-container
                img="order-lg"
                :title="$t('lack_order')"
                :text="$t('lack_active_advert')"
                v-if="!repair.user"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div class="card" v-if="repair.user">
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <!-- :to="{name: 'TheRepairEdit', params: {id: repair.id}}" -->
                        <router-link  :to="{name: 'TheRepairDetail', params: {id: repair.id}, query: { my: true } }">{{ repair.profession[0].title}}</router-link>
                      </div>
                      <div class="card-info-primary">{{$t('experience_single')}} {{ repair.experience }}
                        {{$i18n.locale === 'ru' ? 'лет' : $i18n.locale === 'en' ? 'year' : 'жыл'}}
                      </div>
                      <div class="card-info-secondary">{{ repair.user.name }}</div>
                    </div>
                    <div class="card-caption-primary-right">
                      <div class="card-tools"></div>
                    </div>
                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">
                      <li>{{ repair.region.title }}</li>
                      <li>{{ repair.created_at }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favourite-container" :class="{empty: !services.length}" v-else-if="activeTab === 'service'">
            <app-empty-container
                img="empty-car"
                :title="$t('lack_service')"
                :text="$t('lack_active_advert')"
                v-if="!services.length"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div class="card"
                   v-for="(item, itemIdx) in services"
                   :key="itemIdx"
                   :item="item"
              >
                <!-- :to="{name: 'TheServiceEdit', params: {id: item.id}}" -->
                <div class="card-img">
                  <img v-if="item && item?.images.length" :src="item?.images[0].url" alt="">
                  <router-link class="absolute-link"  :to="{name: 'TheServiceDetail', params: {id: item.id}, query: { my: true } }"></router-link>
                </div>
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <router-link :to="{name: 'TheServiceDetail', params: {id: item.id}, query: { my: true } }">{{ item.type.title }}</router-link>
                      </div>
                      <div class="card-info-primary">{{ item.mark.title }} {{ item.model }}</div>
                      <div class="card-info-secondary">{{ item.driver.name }}</div>
                    </div>
                    <div class="card-caption-primary-right">
                      <div class="card-tools">

                      </div>
                    </div>
                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">
                      <li>{{ item.driver.region.title }}</li>
                      <li>{{ item.created_at | moment("DD.MM.YYYY") }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favourite-container" :class="{empty: !shops.length}" v-else-if="activeTab === 'shop'">
            <app-empty-container
                img="order-lg"
                :title="$t('lack_shop')"
                :text="$t('lack_active_advert')"
                v-if="!shops.length"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div class="card"
                   v-for="(item, itemIdx) in shops"
                   :key="itemIdx"
                   :item="item"
              >
                <div class="card-img">
                  <img v-if="item && item.images.length" :src="item?.images[0].url" alt="">
                  <router-link class="absolute-link"   :to="{name: 'TheShopDetail', params: {id: item.id}, query: { my: true } }"></router-link>
                </div>
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <router-link  :to="{name: 'TheShopDetail', params: {id: item.id}, query: { my: true } }">{{ item.name}}</router-link>
                      </div>
                      <div class="card-info-primary">{{ item.mark.title }} {{ item.model }}</div>
                      <div class="card-info-secondary">{{ item.name }}</div>
                    </div>
                    <div class="card-caption-primary-right">
                      <div class="card-tools">

                      </div>
                    </div>
                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">

                      <li>{{ item.created_at | moment("DD.MM.YYYY") }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favourite-container" :class="{empty: !drivers.length}" v-else>
            <app-empty-container
                img="order-lg"
                :title="$t('lack_shop')"
                :text="$t('lack_active_advert')"
                v-if="!drivers.length"
            ></app-empty-container>
            <div v-else class="favourite-card-list">
              <div class="card"
                   v-for="(item, itemIdx) in drivers"
                   :key="itemIdx"
                   :item="item"
              >
                <div class="card-img">
                  <img v-if="item && item.images.length" :src="item?.images[0].url" alt="">
                  <router-link class="absolute-link"  :to="{name: 'TheOperatorDetail', params: {id: item.id}, query: { my: true } }"></router-link>
                </div>
                <div class="card-caption">
                  <div class="card-caption-primary">
                    <div class="card-caption-primary-left">
                      <div class="card-name">
                        <router-link  :to="{name: 'TheOperatorDetail', params: {id: item.id}, query: { my: true } }">{{ item.mark.title }}</router-link>
                      </div>
                      <div class="card-info-primary">{{ item.model }}</div>
                    </div>

                  </div>
                  <div class="card-caption-secondary">
                    <ul class="card-additional">
                      <li>{{ item.region.title }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
export default {
  name: "TheOrder",

  components: {
    AppEmptyContainer,
    AppProfileCard,
    AppAdvertCard,
    AppSidebarNav,
  },

  data() {
    return {
      activeTab: 'vehicle',
      orders: [],
      vehicles:[],
      repair:{},
      services:[],
      drivers:[],
      shops:[]
    }
  },
  created() {
    this.getVehicles();
    this.getOrders();
    this.getRepaires();
    this.getServices();
    this.myDrivers();
    this.getShops();
  },

  methods: {
    getShops(){
      API.profile.myShops()
          .then((res) => {
            this.shops =res.items.data
          });
    },
    getVehicles() {
      API.profile.myVehicles()
          .then((res) => {
            this.vehicles =res.sale_vehicles.data
          });
    },
    getOrders() {
      API.profile.myOrders()
          .then((res) => {
            this.orders =res.orders.data
          });
    },
    getRepaires() {
      API.profile.myRepaires()
          .then((res) => {
            console.log(res);
            this.repair =res.repairmen
          });
    },
    getServices() {
      API.profile.myServices()
          .then((res) => {

            this.services =res.vehicles
          });
    },
    myDrivers() {
      API.profile.myDrivers()
          .then((res) => {
            console.log(res);
            this.drivers =res.driver_applications.data
          });
    },
    changeTab(name) {
      this.activeTab = name
    }
  }
}
</script>

<style scoped>

</style>
