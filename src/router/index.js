import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '@/firebase'

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
  component: () => import('@/views/Login.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/registration',
    name: 'Registration',
  component: () => import('@/views/Registration.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/history',
    name: 'History',
  component: () => import('@/views/History.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/policy',
    name: 'Policy',
  component: () => import('@/views/Policy.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/conditions',
    name: 'Conditions',
  component: () => import('@/views/Conditions.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
  component: () => import('@/views/404.vue'),
    meta: {
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requireAuth = to.matched.some(route => route.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
