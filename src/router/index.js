import Vue from 'vue'
import Router from 'vue-router'
import BrandList from '@/components/BrandList'
import BrandInfo from '@/components/BrandInfo'
import UserLogin from '@/components/UserLogin'
import UserInfo from '@/components/UserInfo'
import Identity from '@/components/Identity'

Vue.use(Router);

let router = new Router({
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
      path: '/brand/info',
      name: 'BrandInfo',
      component: BrandInfo,
      meta: {
        title: '品牌导览'
      }
    },
    {
      path: '/user-login',
      name: 'UserLogin',
      component: UserLogin,
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        title: '我的信息'
      }
    },
    {
      path: '/identity',
      name: 'Identity',
      component: Identity,
      meta: {
        title: '实名认证'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
