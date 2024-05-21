import errorHandler from "../helpers/errorHandler";
import render from '../helpers/renderRouterView';
import store from '@/store'

const ifAuthenticated = async (to, from, next) => {
  if (store.getters.loggedIn) next()
  else {
    next('/')
  }

}
export default [
  {
    path: 'profile',
    component: {
      render
    },
    children: [
      {
        path: '',
        name: 'TheProfileEdit',
        component: () => import('../views/TheProfile/TheProfileEdit').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Профиль',
        },
      },
      {
        path: 'adverts',
        name: 'TheAdverts',
        component: () => import('../views/TheProfile/TheAdverts').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Профиль',
        },
      },
      {
        path: 'favourite',
        name: 'TheFavourite',
        component: () => import('../views/TheProfile/TheFavourite').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Избранное',
        },
      },
      {
        path: 'password',
        name: 'TheProfilePassword',
        component: () => import('../views/TheProfile/TheProfilePwd').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Избранное',
        },
      },
      {
        path: 'faq',
        name: 'TheFaq',
        component: () => import('../views/TheProfile/TheFaq').catch(errorHandler),
        meta: {
          authorization: true,
          title:'Часто задаваемые вопросы',
        },
      },
    ],
    beforeEnter: ifAuthenticated
  }
]
