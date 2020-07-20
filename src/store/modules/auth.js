import firebase from 'firebase/app'

export default {
    state: {
        error: null
    },
    actions: {
        async login({commit},{email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e){
                commit('changeError', e)
                console.clear();
            }
        },
        async register ({dispatch, commit}, {email, password, firstname, lastname, avatar}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`users/${uid}/info`).set({
                    firstname,
                    lastname,
                    avatar
                })

            } catch (e) {
                commit('changeError', e)
                console.clear();
            }
        },
        getUid () {
            const user = firebase.auth().currentUser;
            return user ? user.uid : null;
        },
        async logout ({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    },
    getters: {
        getError (state) {
            return state.error
        }
    },
    mutations: {
        changeError (state, message) {
            state.error = message
        }
    }
}