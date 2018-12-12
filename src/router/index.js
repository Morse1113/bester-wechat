import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BrandList from '@/components/BrandList'
import UserLogin from '@/components/UserLogin'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
