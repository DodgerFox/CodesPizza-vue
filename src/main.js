import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import store from './store'
import router from './router'

import { auth, onAuthStateChanged } from './firebase'
import messagesPlugin from '@/utils/messages.plugin.js'
import Loader from '@/components/Loader.vue'

let app

const head = createHead()

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.component('Loader', Loader)
    app.use(store)
    app.use(router)
    app.use(head)
    app.use(messagesPlugin)
    app.mount('#app')
  }
})