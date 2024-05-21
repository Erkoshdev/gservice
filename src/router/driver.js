import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';
import API from '@/api';
export default [
  {
    path: 'driver',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheDriver',
        component: () => import('../views/TheAddProducts/TheDriver').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
        beforeEnter: (to, from, next) => {
          API.profile.myServices().then((res) => {
            if (!res.success) next('/add-advert/service');
            else next()
          });

        },
      },
      {
        path: 'edit/:id',
        name: 'TheDriverEdit',
        component: () => import('../views/TheAddProducts/TheDriver').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
      },
    //   {
    //     path: ':id',
    //     name: 'TheDriverDetail',
    //     component: () => import('../views/TheProduct/TheRepairDetail').catch(errorHandler),
    //     meta: {
    //       authorization: false,
    //       title:'Ремонт',
    //     },
    //   },
    ]
  }
]
