import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'vehicle',
    component: {
      render
    },
    children: [
      {
        path: 'add',
        name: 'TheVehicle',
        component: () => import('../views/TheAddProducts/TheVehicle').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Спецтехника',
        },
      },
      {
        path: 'edit/:id',
        name: 'TheVehicleEdit',
        component: () => import('../views/TheAddProducts/TheVehicle').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
      {
        path: ':id',
        name: 'TheVehicleDetail',
        component: () => import('../views/TheProduct/TheVehicleDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Спецтехника',
        },
      },
     
    ]
  }
]
