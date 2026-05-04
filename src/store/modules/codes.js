import { addUserCodes, getUserCodes, setUserCodes } from '@/firebase'

export default {
    state: {},
    actions: {
        async addCodes ({ dispatch }, codes) {
            const todayDate = new Date();
            const currYear = todayDate.getFullYear();
            const currMonth = todayDate.getMonth()+1;
            const currDay = todayDate.getDate();
            const date = currDay + "-" + currMonth + "-" + currYear;
            
            const uid = await dispatch('getUid');
            if (!uid) return
            addUserCodes(uid, date, codes)
        },
        async fetchCodes({dispatch, commit}) {
            try {
              const uid = await dispatch('getUid')
              if (!uid) return {}
              const codes = getUserCodes(uid)
              
              return codes;
            } catch (e) {
              commit('setError', e)
              throw e
            }
          },
        async updateCodes ({ dispatch }, { codes }) {
            const uid = await dispatch('getUid');
            if (!uid) return
            setUserCodes(uid, codes)
          }
    },
    mutations: {},
    getters: {
    }
}