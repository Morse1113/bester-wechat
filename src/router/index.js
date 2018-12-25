import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BrandList from '@/components/BrandList'
import BrandInfo from '@/components/BrandInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/brand/list',
      name: 'BrandList',
      component: BrandList
    },
    {
      path: '/brand/info',
      name: 'BrandInfo',
      component: BrandInfo
    }
  ]
})
