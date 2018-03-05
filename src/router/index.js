import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue';
import GoodsComment from '../component/admin/goods/comment/Comment.vue';

Vue.use(VueRouter)

//购物车页面路由配置
const goods = [
    { name: 'goodsList', path: 'goods/list', component: GoodsList },
    { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail },
    { name: 'goodsGoodsComment', path: 'goods/comment', component: GoodsComment }

]
let router = new VueRouter({ 
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] },

    ]
})
//添加
router.beforeEach((to, form, next) => {
    // console.log(to);
    // console.log(form);
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
        //不是vue的组件中，所以这里this不是组件而是undefined
        let isLogin=false;
        //已经登入
        if (res.data.code == 'logined') {
            isLogin=true;

        }
        //如果访问登录页面
        //登录
        if (to.name == 'login') {
            if (isLogin) {
                next({ name: 'admin' })
            }else{ 
                next()
            }
        } 
        
        if (to.name != 'login') { 
            if (isLogin) {
                next()
              
            }else{
                 next({ name: 'login',query:{next:to.fullPath} })
            }
        } 

    }) 

});
export default router;