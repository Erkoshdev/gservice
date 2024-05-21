const state = {
  isOverlay: false,
  isShortOverlay: false,
  spinnerLoader: false,
}

const mutations = {
  setOverlay(state, payload) {
    state.isOverlay = payload;
  },
  setShortOverlay(state, payload) {
    state.isShortOverlay = payload;
  },
  setSpinnerLoader(state, payload) {
    state.spinnerLoader = payload;
  },
}

const getters = {
  isOverlay: (state) => state.isOverlay,
  isShortOverlay: (state) => state.isShortOverlay,
  spinnerLoader: (state) => state.spinnerLoader,
}

export default {
  state,
  mutations,
  getters,
}
