import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';
import store from '@/store';
import API from '@/api';
const ifAuthenticated = async (to, from, next) => {
  if (store.getters.loggedIn) next()
  else {
    next('/');
  }
}

export default [
  {
    path: 'add-advert',
    component: {
      render
    },
    children: [
      {
        path: '',
        name: 'TheAddAdvert',
        component: () => import('../views/TheAddProducts/TheAddAdvert').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить объявления',
        },
      },
      {
        path: 'vehicle',
        name: 'TheAddVehicle',
        component: () => import('../views/TheAddProducts/TheVehicle').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить спецтехнику',
        },
      },
      {
        path: 'order',
        name: 'TheAddOrder',
        component: () => import('../views/TheAddProducts/TheOrder').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить заказ',
        },
      },
      {
        path: 'service',
        name: 'TheAddService',
        component: () => import('../views/TheAddProducts/TheService').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить услугу',
        },
      },
      {
        path: 'shop',
        name: 'TheAddShop',
        component: () => import('../views/TheAddProducts/TheShop').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить запчасть',
        },
        beforeEnter: (to, from, next) => {
          API.product.checkMyShop().then((res) => {
            if (res.status.id === 2) next('/add-advert/shopitem');
            else if (res.status.id === 1) next('/add-advert/shopstatus');
            else if (res.status.id === 3) next('/add-advert/shopstatus?reject="true"');
            else next()
          });
        },
      },
      {
        path: 'shopstatus',
        name: 'TheShopStatus',
        component: () => import('../views/TheAddProducts/TheShopStatus').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Статус магазина',
        },
      },
      {
        path: 'shopitem',
        name: 'TheShopItem',
        component: () => import('../views/TheAddProducts/TheShopItem').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить оператора',
        },
      },
      {
        path: 'repair',
        name: 'TheAddRepair',
        component: () => import('../views/TheAddProducts/TheRepair').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить ремонт',
        },
      },
      {
        path: 'driver',
        name: 'TheAddDriver',
        component: () => import('../views/TheAddProducts/TheDriver').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Добавить оператора',
        },
        beforeEnter: (to, from, next) => {
          API.profile.myServices().then((res) => {
            if (!res.vehicles.length) next('/add-advert/service');
            else next()
          });

        },
      },

    ],
    beforeEnter: ifAuthenticated
  }
]
