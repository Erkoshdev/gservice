import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';

export default [
  {
    path: 'operator',
    component: {
      render
    },
    children: [
      {
        path: ':id',
        name: 'TheOperatorDetail',
        component: () => import('../views/TheProduct/TheOperatorDetail').catch(errorHandler),
        meta: {
          authorization: false,
          title:'Оператор',
        },
      },
    ]
  }
]
