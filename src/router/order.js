import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'order',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheOrder',
        component: () => import('../views/TheAddProducts/TheOrder').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Заказы',
        },
      },
      {
        path: 'edit/:id',
        name: 'TheOrderEdit',
        component: () => import('../views/TheAddProducts/TheOrder').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Заказы',
        },
      },
      {
        path: ':id',
        name: 'TheOrderDetail',
        component: () => import('../views/TheProduct/TheOrderDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Заказы',
        },
      },
    ]
  }
]
