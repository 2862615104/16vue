import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import Shopcart from '../component/admin/shopcart/Shopcart.vue'
 Vue.use(VueRouter)
 
 //购物车页面路由配置
 const shopcart=[
     { name: 'shopcart', path: 'shopcart', component: Shopcart }
 ]
export default new VueRouter({
     routes:[
         {name :'login',path:'/login',component:Login},
         { name: 'admin', path: '/admin', component: Admin, children: [...shopcart]},
         
     ]
 })