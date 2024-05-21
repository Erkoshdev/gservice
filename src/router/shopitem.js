import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'shopitem',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheShopItem',
        component: () => import('../views/TheAddProducts/TheShopItem').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Спецтехника',
        },
      },
      {
        path: 'edit/:id',
        name: 'TheShopItemEdit',
        component: () => import('../views/TheAddProducts/TheShopItem').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
      {
        path: ':id',
        name: 'TheShopItemDetail',
        component: () => import('../views/TheProduct/TheShopDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
     
    ]
  }
]
