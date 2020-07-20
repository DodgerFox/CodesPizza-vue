import firebase from 'firebase/app'

export default {
    state: {},
    actions: {
        async addCodes ({dispatch}, codes) {
            const todayDate = new Date();
            const currYear = todayDate.getFullYear();
            const currMonth = todayDate.getMonth()+1;
            const currDay = todayDate.getDate();
            const date = currDay + "-" + currMonth + "-" + currYear;
            
            const uid = await dispatch('getUid');
            await firebase.database().ref(`users/${uid}/codes/${date}`).push(codes);
        },
        async fetchCodes({dispatch, commit}) {
            try {
              const uid = await dispatch('getUid')
              const codes = (await firebase.database().ref(`/users/${uid}/codes`).once('value')).val() || {}
              
              return codes;
            } catch (e) {
              commit('setError', e)
              throw e
            }
          },
        async updateCodes ({dispatch}, {codes, date}) {
            const uid = await dispatch('getUid');
            date
            await firebase.database().ref(`users/${uid}/codes/`).update(codes);
          }
    },
    mutations: {},
    getters: {
    }
}