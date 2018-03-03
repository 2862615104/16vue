import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue';
import GoodsComment from '../component/admin/goods/comment/Comment.vue';

 Vue.use(VueRouter)
 
 //购物车页面路由配置
 const goods=[
     { name: 'goodsList', path: 'goods/list', component: GoodsList },
     { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail },
     { name: 'goodsGoodsComment', path: 'goods/comment', component: GoodsComment }

 ]
export default new VueRouter({
     routes:[
         {name :'login',path:'/login',component:Login},
         { name: 'admin', path: '/admin', component: Admin, children: [...goods]},
         
     ] 
 })