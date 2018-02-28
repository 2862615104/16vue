import Vue from 'vue'
import App from './component/App.vue';
// 路由
import vueRouter from "./router"
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'

import axios from 'axios'    //不是vue插件，导入之后只能在模块使用

import api, { domain } from './js/api.js'
import './less/index.less'

Vue.use(ElementUI)

// axios.get(domain+api.logout).then(()=>console.log('登录'))
// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;

// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;
//把axios和api添加到Vue原型
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
new Vue({
    el: '#app',
    //  render :createElement =>createElement(App)   
    render(createrElement) {
        return createrElement(App);
    },
    router: vueRouter
})