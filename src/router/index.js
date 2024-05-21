import Vue from 'vue'
import VueRouter from 'vue-router'
import render from '../helpers/renderRouterView'
import auth from './auth'
import filter from './filter'
import registration from './registration'
import profile from './profile'
import vehicle from "@/router/vehicle";
import repairmen from "@/router/repairmen";
import shop from "@/router/shop";
import order from "@/router/order";
import service from "@/router/service";
import operator from "@/router/operator";
import driver from "@/router/driver";
import advert from "@/router/advert";
import shopitem from "@/router/shopitem";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: {
      render
    },
    children: [
      {
        path: '',
        name: 'TheHome',
        component: () => import('../views/TheHome'),

      },
      {
        path: '/success/:id',
        name: 'TheAddSuccess',
        component: () => import('../views/TheAddProducts/TheAddSuccess'),

      },
      ...auth,
      ...filter,
      ...registration,
      ...profile,
      ...vehicle,
      ...repairmen,
      ...shop,
      ...order,
      ...service,
      ...operator,
      ...driver,
      ...advert,
      ...shopitem
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

// const mobileRedirected = async (to, from, next) => {
//   if (window.innerWidth < 767) {
//     next('https://www.w3schools.com/')
//   } else {
//     next()
//   }
// }

router.beforeEach((to, from, next) => {
  if (window.innerWidth < 767) {
    window.location.href='http://m.gservice.kz/'
  } else {
    next()
  }
})

router.afterEach(async (to) => {
  if (!['VAuth', 'VEmailConfirm'].includes(to.name)) {
    Vue.nextTick(() => {
      // document.getElementById('pagetitle').innerHTML =  to.meta.title;
    });

  }
});
export default router
