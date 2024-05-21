import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'repairmen',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheRepair',
        component: () => import('../views/TheAddProducts/TheRepair').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
      },
      {
        path: 'edit/:id',
        name: 'TheRepairEdit',
        component: () => import('../views/TheAddProducts/TheRepair').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
      },
      {
        path: ':id',
        name: 'TheRepairDetail',
        component: () => import('../views/TheProduct/TheRepairDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Ремонт',
        },
      },
    ]
  }
]
