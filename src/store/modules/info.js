import { getUserInfo } from '@/firebase'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        if (!uid) {
          commit('setInfo', {})
          return
        }
        const info = getUserInfo(uid)
        commit('setInfo', info)
        
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
