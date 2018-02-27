import Vue from 'vue'
import App from './component/App.vue';
// 路由
import vueRouter from "./router"
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
 el:'#app',
//  render :createElement =>createElement(App)   
render(createrElement){
    return createrElement(App);
},
router: vueRouter
})