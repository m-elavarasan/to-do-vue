import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../components/LoginComp.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('user');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (currentUser && to.name === 'login') {
    next('/');
  } else {
    next();
  }
});

export default router
