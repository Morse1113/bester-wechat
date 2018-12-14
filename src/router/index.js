import Vue from 'vue'
import Router from 'vue-router'
import BrandList from '@/components/BrandList'
import UserLogin from '@/components/UserLogin'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user-login'
    },
    {
      path: '/brand-list',
      name: 'BrandList',
      component: BrandList
    },
    {
      path: '/user-login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
