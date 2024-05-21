import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';
import API from '@/api';

export default [
  {
    path: 'shop',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheShop',
        component: () => import('../views/TheAddProducts/TheShop').catch(errorHandler),
        meta: {
          authorization: true,
        },
        beforeEnter: (to, from, next) => {
          API.product.getMyShop().then((res) => {
            if (res.success) next('/shopitem/add');
            else next()
          });

        },
      },
      {
        path: 'edit/:id',
        name: 'TheShopEdit',
        component: () => import('../views/TheAddProducts/TheShop').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
         beforeEnter: (to, from, next) => {
          API.product.getMyShop().then((res) => {
            if (res.error) next('/shopitem/add');
            else next()
          });

        },
      },
      {
        path: ':id',
        name: 'TheShopDetail',
        component: () => import('../views/TheProduct/TheShopDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Магазин',
        },
      },
    ]
  }
]
