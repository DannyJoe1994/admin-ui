import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import Login from '@/components/Login'
import Test from '@/components/Test'
import Home from '@/components/Home'

import Dashboard from '@/components/dashboard/Dashboard'

import Customer from '@/components/customer/Customer'
import User from '@/components/user/User'

import Order from '@/components/order/Order'
import Broker from '@/components/broker/Broker'

import Product from '@/components/product/Product'

import Charts from '@/components/charts/Charts'

import Config from '@/components/config/Config'


Vue.use(Router)
Vue.use(ElementUI)


export default new Router({
  /*mode: 'history',*/
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: Login, meta: {title: '登陆'}},
    {path: '/test', name: 'Test', component: Test, meta: {title: '测试'}},
    {
      path: '/home', component: Home,
      children: [
        {path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: {title: '主页'}},
        {path: '/customer', name: 'Customer', component: Customer, meta: {title: '客户'}},
        {path: '/user', name: 'User', component: User, meta: {title: '系统用户'}},
        {path: '/order', name: 'Order', component: Order, meta: {title: '订单'}},
        {path: '/broker', name: 'Broker', component: Broker, meta: {title: '经销商'}},
        {path: '/product', name: 'Product', component: Product, meta: {title: '图册'}},
        {path: '/charts', name: 'Charts', component: Charts, meta: {title: '订单图表'}},
        {path: '/config', name: 'Config', component: Config, meta: {title: '配置'}}
      ]
    },
  ]
})
