import { db } from '@/firebase'
import { get, push, ref, update } from 'firebase/database'

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
            await push(ref(db, `users/${uid}/codes/${date}`), codes)
        },
        async fetchCodes({dispatch, commit}) {
            try {
              const uid = await dispatch('getUid')
              const snapshot = await get(ref(db, `/users/${uid}/codes`))
              const codes = snapshot.val() || {}
              
              return codes;
            } catch (e) {
              commit('setError', e)
              throw e
            }
          },
        async updateCodes ({ dispatch }, { codes }) {
            const uid = await dispatch('getUid');
            await update(ref(db, `users/${uid}/codes/`), codes)
          }
    },
    mutations: {},
    getters: {
    }
}