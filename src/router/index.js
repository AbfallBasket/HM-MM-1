import Vue from 'vue';

// 引入路由包
import VueRouter from 'vue-router';

// 引入 子 组件
import test from '../components/test';
import login from '../views/login/index';
import useElement from '../views/useElement/index';

// 引入验证码 组件
import siden from '../views/iden/siden';


// 注册全局路由
Vue.use(VueRouter);

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
            path: '/test', component: test,
        },
        {
            // 创建登录 login 路由跳转
            path: '/login',
            component: login,
            children: [
                {
                    path: '/login',
                    component: useElement,
                    children:[
                        {
                            path:'/login',
                            components:{
                                side: siden,
                            }
                        }
                    ]

                }
            ]
        },
        // {
        //     // 创建登录 login 路由跳转
        //     path: '/useElement',
        //     component:useElement,
        // },

    ],
});
export default router