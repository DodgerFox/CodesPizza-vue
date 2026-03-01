import { db } from '@/firebase'
import { get, ref } from 'firebase/database'

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
        const snapshot = await get(ref(db, `/users/${uid}/info`))
        const info = snapshot.val()
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
