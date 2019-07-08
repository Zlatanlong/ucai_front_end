import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/pages/home'], resolve)
    },
    {
      path: '/testshow',
      name: 'testshow',
      component: resolve => require(['@/pages/user/components/nav-user'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/user/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/user/register'], resolve)
    },
    {
      path: '/activate-success',
      component: resolve => require(['@/components/activate/activate-success'], resolve)
    },
    {
      path: '/activate-failed',
      component: resolve => require(['@/components/activate/activate-failed'], resolve)
    },
    {
      path: '/manager-dish',
      name: 'manager-dish',
      component: resolve => require(['@/pages/manager-dish/index'], resolve),
      children: [
        {
          path: 'add',
          name: 'manager-add',
          component: resolve => require(['@/pages/manager-dish/add-dish.vue'], resolve)
        },
        {
          path: 'adminLogin',
          name: 'adminLogin',
          component: resolve => require(['@/pages/manager-dish/adminLogin'], resolve)
        },
        {
          path: 'adminOperator',
          name: 'adminOperator',
          component: resolve => require(['@/pages/manager-dish/adminOperator'], resolve)
        }
      ]
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: resolve => require(['@/pages/dishes'], resolve)
    },
    {
      path: '/dish/:id',
      name: 'dish',
      component: resolve => require(['@/pages/dish'], resolve),
      props: true
    },
    {
      path: '/search/:sth',
      name: 'search',
      component: resolve => require(['@/pages/searchResult'], resolve),
      props: true
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: resolve => require(['@/pages/user/user'], resolve),
      props: true,
      children: [
        {
          path: 'notice',
          component: resolve => require(['@/pages/user/notice'], resolve)
        },
        {
          path: 'info',
          component: resolve => require(['@/pages/user/user-info'], resolve),
          props: true
        },
        {
          path: 'likes-history',
          component: resolve => require(['@/pages/user/likes-history'], resolve),
          props: true
        }
      ]
    },
    {
      path: '/edit',
      name: 'edit',
      component: resolve => require(['@/pages/user/edit'], resolve)
    },
    {
      path: '/update-log',
      name: 'update-log',
      component: resolve => require(['@/pages/update-log'], resolve)
    },
    {
      path: '/userOperator',
      name: 'userOperator',
      component: resolve => require(['@/pages/userOperator'], resolve)
    },
    {
      path: '/delLink',
      name: 'delLink',
      component: resolve => require(['@/pages/delLink'], resolve)
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: resolve => require(['@/pages/restaurants'], resolve)
    }
  ]
})
