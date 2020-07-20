import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import messagesPlugin from '@/utils/messages.plugin.js'
import Loader from '@/components/Loader'
import VueClipboard from 'vue-clipboard2'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
 

Vue.component('Loader', Loader)
Vue.use(messagesPlugin)
Vue.use(Vuelidate)
Vue.use(VueClipboard)
Vue.use(VueMeta)

Vue.config.productionTip = false



let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})