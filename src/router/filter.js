import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'filter',
    component: {
      render
    },
    children: [
      {
        path: 'vehicle',
        name: 'TheFilterVehicle',
        component: () => import('../views/TheFilters/TheFilterVehicle').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
      {
        path: 'repair',
        name: 'TheFilterRepair',
        component: () => import('../views/TheFilters/TheFilterRepair').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
      },
      {
        path: 'shop',
        name: 'TheFilterShop',
        component: () => import('../views/TheFilters/TheFilterShop').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Магазин',
        },
      },
      {
        path: 'order',
        name: 'TheFilterOrder',
        component: () => import('../views/TheFilters/TheFilterOrder').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Заказы',
        },
      },
      {
        path: 'service',
        name: 'TheFilterService',
        component: () => import('../views/TheFilters/TheFilterService').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Услуги',
        },
      },
      {
        path: 'operator',
        name: 'TheFilterOperator',
        component: () => import('../views/TheFilters/TheFilterOperator').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Оператор',
        },
      },
    ]
  }
]
