// 导入 vue包
import Vue from 'vue';
// 导入APP父组件
import App from './App.vue';
// 导入router 路由包
import {router,store} from './router/index';

// 导入 axios包
import axios from '../node_modules/axios';

Vue.prototype.$ax = axios;


// 导入 element-ui包
import ElementUI from 'element-ui';
// 导入elementCss
import 'element-ui/lib/theme-chalk/index.css';

// 导入 element 组件包
import 'element-ui/lib/index';

// 全局注册 element包
Vue.use(ElementUI);

// 导入全局样式 style
import '../src/style/index.css';

// 导入 全局样式 less
import 'less';

// 导入 全局 过滤器  filter
import './filters/timefilter';


// 引入 学科子组件 和 企业子组件
import subSel from './components/subSel';
import enterSel from './components/enterSel';
// 引入 城市选择组件
import myCity from './components/myCity';
// 全局注册 子组件
Vue.component('subSelCom',subSel);
Vue.component('enterCom',enterSel);
Vue.component('myCity',myCity);


// 注册 富文本编辑框
import vueQuillEditor from 'vue-quill-editor';
import '../node_modules/quill/dist/quill.core.css'
import '../node_modules/quill/dist/quill.snow.css'
import '../node_modules/quill/dist/quill.bubble.css'

// 全局注册 富文本
Vue.use(vueQuillEditor);

// 关闭提示
Vue.config.productionTip = false;


// 创建 一个vue的 实例
new Vue({
    store:store,
    //  render 是讲 app.vue渲染到 vue实例中
    render: h => h(App),
//    把路由挂载到App中
    router: router,
}).$mount('#app');
