import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'service',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheService',
        component: () => import('../views/TheAddProducts/TheService').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Услуги',
        },
      },
      {
        path: 'edit/:id',
        name: 'TheServiceEdit',
        component: () => import('../views/TheAddProducts/TheService').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
      {
        path: ':id',
        name: 'TheServiceDetail',
        component: () => import('../views/TheProduct/TheServiceDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Услуги',
        },
      },
    ]
  }
]
