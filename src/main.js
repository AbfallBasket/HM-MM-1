
// 导入 vue包
import Vue from 'vue';
// 导入APP父组件
import App from './App.vue';
// 导入router 路由包
import router from './router/index';

// 导入 element-ui包
import ElementUI from 'element-ui';
// 导入elementCss
import 'element-ui/lib/theme-chalk/index.css';

// 导入 element 组件包
import 'element-ui/lib/index';


// 导入全局样式 style
import '../src/style/index.css';

// 导入 全局样式 less
import 'less';


// 全局注册 element包
Vue.use(ElementUI);

// 关闭提示
Vue.config.productionTip = false;


// 创建 一个vue的 实例
new Vue({
  //  render 是讲 app.vue渲染到 vue实例中
  render: h => h(App),
//    把路由挂载到App中
    router:router,
}).$mount('#app');
