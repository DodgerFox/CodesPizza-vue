import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import info from './modules/info'
import codes from './modules/codes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    codes
  }
})
