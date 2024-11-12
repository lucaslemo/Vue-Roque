import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: true
      },
      component: () => import('@/views/app/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/logout',
      name : 'logout',
      component: {}
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/errors/404View.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()
  if (to.name === 'logout') {
    auth.clear()
    next({name: 'login'})

  } else if(to.name === 'login') {
    const isAuthenticated = auth.hasTokenStored

    if (isAuthenticated) {
      next({ name: 'home' })
    }
    else {
      next()
    }
  } else if (to.meta?.auth === true) {
    const isAuthenticated = await auth.checkToken()

    if (!isAuthenticated) {
      next({ name: 'login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
