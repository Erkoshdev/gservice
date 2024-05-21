<template>
  <div class="page-wrapper add-advert-page">
    <div class="internal-wrapper">
      <div></div>
      <div class="add-advert">
        <div class="add-advert-title">
          <p>{{ $t('to_add_advert') }}</p>
        </div>
        <div class="add-advert-list">
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/tractor-32-yellow.svg" alt="">
            </div>
            <b> {{ $t('specialequipment') }} </b>
            <router-link class="absolute-link" :to="{name: 'TheAddVehicle'}"></router-link>
          </div>
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/order-32-yellow.svg" alt="">
            </div>
            <b>  {{ $t('order') }}</b>
            <router-link class="absolute-link" :to="{name: 'TheAddOrder'}"></router-link>
          </div>
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/bag-32-yellow.svg" alt="">
            </div>
            <b>{{ $t('service') }}</b>
            <router-link class="absolute-link" :to="{name: 'TheAddService'}"></router-link>
          </div>
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/bag-32-yellow.svg" alt="">
            </div>
            <b> {{ $t('shop') }}</b>
           <router-link class="absolute-link" :to="{name: 'TheAddShop'}"></router-link>
          </div>
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/service-32-yellow.svg" alt="">
            </div>
            <b> {{ $t('remont') }}</b>
            <router-link class="absolute-link" :to="{name: 'TheAddRepair'}"></router-link>
          </div>
          <div class="add-advert-item">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/steering-wheel-32-yellow.svg" alt="">
            </div>
            <b> {{ $t('operator') }}</b>
            <router-link class="absolute-link" :to="{name: 'TheAddDriver'}"></router-link>
          </div>
          <div class="add-advert-item add-advert-item-lg">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/truck-32-yellow.svg" alt="">
            </div>
            <b>  {{ $t('Logistics') }}</b>
            <p>{{ $t('logistics_desc') }}</p>
          </div>
          <div class="add-advert-item add-advert-item-lg">
            <div class="add-advert-icon">
              <img src="@/assets/img/icon/production-32-yellow.svg" alt="">
            </div>
            <b style="color: #6D7885"> {{ $t('production') }}</b>
            <p>{{ $t('buy_repair_to_your_car') }}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheAddAdvert"
}
</script>

<style scoped>

</style>
