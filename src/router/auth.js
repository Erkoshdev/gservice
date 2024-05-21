import errorHandler from "../helpers/errorHandler";

export default [
  {
    path: '/login',
    name: 'TheLogin',
    component: () => import('../views/TheAuth/TheLogin').catch(errorHandler),
  },
  {
    path: '/resetpwd',
    name: 'TheResetPwd',
    component: () => import('../views/TheAuth/TheResetPwd').catch(errorHandler),
  },
]
