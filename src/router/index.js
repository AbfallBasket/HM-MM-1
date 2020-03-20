import Vue from 'vue';

// 引入路由包
import VueRouter from 'vue-router';

// 引入 子 组件
import login from '../views/login/index';
import useElement from '../views/useElement/index';

// 导入index组件
import index from '../views/index/index';

// 引入右侧index子组件
import chart from '../views/chart/chart';
import enterprise from '../views/enterprise/enterprise';
import question from '../views/question/question';
import subject from '../views/subject/subject';
import user from '../views/user/user';

//引入index子组件
import myAside from '../views/index/myAside';

// 注册全局路由
Vue.use(VueRouter);

// 注册原型 vue 的基地址
Vue.prototype.$url = 'http://127.0.0.1:8085/heimamm/public';

Vue.prototype.$oneLineurl = 'http://183.237.67.218:3002';


// 解决重复点击路由路径重复报错 的 代码
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
};

// 实例化路由
const router = new VueRouter({
    routes: [
        {
            // test 测试路由
            path: '*', redirect: '/login',
        },
        {
            // 创建登录 login 路由跳转
            path: '/login',
            component: login,
            children: [
                {
                    path: '/login',
                    component: useElement,
                }
            ]
        },
        {
            // 创建登录 index 路由跳转
            path: '/index',
            component: index,
            props: (route) => {
                return {
                    temp: route.params.temp
                }
            },
            children: [
                {
                    path:'/index',
                    components:{
                        'myAside': myAside,
                    }
                },
                {
                    path: '/index/:temp',
                    components: {
                        'myAside': myAside,
                        'user':user,
                        'chart':chart,
                        'subject':subject,
                        'question':question,
                        'enterprise':enterprise,
                    },
                }
            ],
        },

    ],
});
export default router