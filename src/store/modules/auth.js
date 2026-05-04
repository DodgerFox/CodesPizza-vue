import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    setUserInfo
} from '@/firebase'

export default {
    state: {
        error: null
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                commit('changeError', e)
                console.clear()
                throw e
            }
        },
        async register ({ dispatch, commit }, { email, password, firstname, lastname, avatar }) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const uid = await dispatch('getUid')
                setUserInfo(uid, {
                    firstname,
                    lastname,
                    avatar
                })
            } catch (e) {
                commit('changeError', e)
                console.clear()
                throw e
            }
        },
        getUid () {
            const user = auth.currentUser
            return user ? user.uid : null
        },
        async logout ({ commit }) {
            await signOut(auth)
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