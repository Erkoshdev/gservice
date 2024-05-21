import router from "@/router";
import errorHandler from "@/helpers/errorHandler";

const state = {
    token: window.localStorage.getItem('gservice-token') || '',
    lang: window.localStorage.getItem('language') || 'kz',
    user: JSON.parse(window.localStorage.getItem('user')) || '',
}

const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload;
    },
    AUTH_LOGOUT(state) {
        state.token = '';
    },
    setLocale(state, locale) {
        window.localStorage.setItem('language', locale);
        window.location.reload();
    },
    setProfile(state, payload) {
        state.user = payload;
        window.localStorage.setItem('user', JSON.stringify(payload));
    },
}

const getters = {
    loggedIn: (state) => !!state.token,
    getUserName: (state) => state.user?.name,
    getPhone: (state) => state.user?.phone,
}
const actions = {
    login({ commit }, token) {
        console.log('test');
        commit('SET_TOKEN', token);
        window.localStorage.setItem('gservice-token', token)
    },
    logout({ commit }) {
        commit('AUTH_LOGOUT');
        window.localStorage.removeItem('gservice-token');
        router.push('/login').catch(errorHandler)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}
