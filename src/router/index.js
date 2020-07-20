import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      auth: false
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/views/Registration'),
    meta: {
      auth: false
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History'),
    meta: {
      auth: true
    }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/Policy'),
    meta: {
      auth: false
    }
  },
  {
    path: '/conditions',
    name: 'Conditions',
    component: () => import('@/views/Conditions'),
    meta: {
      auth: false
    }
  },
  {
    path: '*',
    component: () => import('@/views/404'),
    meta: {
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(forum => forum.meta.auth)
  

  if (requireAuth && !currentUser){
    next('/login')
  } else {
    next()
  } 
})

export default router
