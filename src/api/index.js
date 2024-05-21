import authApi from './auth.api';
import main from './main.api';
import notification from './notification.api';
import favourite from './favourite.api';
import filter from './filter.api';
import product from './product.api';
import search from './search.api';
import profile from './profile.api'
import productAdd from './productAdd.api'
import favorite from './favorite.api'
import social from './social.api'

const API = {
    authApi,
    favorite,
    notification,
    favourite,
    ...main,
    ...search,
    ...filter,
    ...product,
    ...profile,
    ...productAdd,
    ...social
}

export default API
