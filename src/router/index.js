import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Commodity from '../views/commodity.vue'
import Users from '../views/users.vue'
import UpdateCommodity from '../views/updateCommodity.vue'
import AddCommodity from '../views/addCommodity.vue'
import RegisterAndLogin from '../views/registerAndLogin.vue'
import Cart from '../views/cart.vue'
import Mall from '../views/mall.vue'
import Index from '../views/index.vue'
import Orders from '../views/orders.vue'
import MyOrder from '../views/myOrder.vue'
import DetailCommodity from '../views/detailCommodity.vue'
import PersonCenter from '../views/personCenter.vue'
import AliPay from '../views/alipay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/alipay',
      name: 'AliPay',
      component: AliPay
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall,
    },
    {
      path: '/personCenter',
      name: 'PersonCenter',
      component: PersonCenter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/detailCommodity',
      name: 'DetailCommodity',
      component: DetailCommodity
    },
    {
      path: '/registerAndLogin',
      name: 'RegisterAndLogin',
      component: RegisterAndLogin
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
      {

        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: "/commodity",
        name: 'Commodity',
        component: Commodity
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders
      },
      {
        path: "/updateCommodity",
        name: 'UpdateCommodity',
        component: UpdateCommodity,
      },
      {
        path: "/addCommodity",
        name: 'AddCommodity',
        component: AddCommodity,
      }
      ]
    }
  ]
})
