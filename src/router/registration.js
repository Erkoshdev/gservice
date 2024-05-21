import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'registration',
    component: {
      render
    },
    children: [
      {
        path: '',
        name: 'TheRegistration',
        component: () => import('../views/TheAuth/TheRegistration').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Поиск',
        },
      },
    ]
  }
]
