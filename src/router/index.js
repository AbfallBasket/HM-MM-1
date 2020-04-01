import Vue from 'vue';

// 引入路由包
import VueRouter from 'vue-router';

// 引入 子 组件
import login from '../views/login/index';
import useElement from '../views/useElement/index';

// 导入index组件
import index from '../views/index/index';


import children from './childrenRouter';


// 导入检测 token 接口
import {getToken} from "../utils/myToken";

// 导入 检测用户 信息接口
import {getInfo} from "../api/index";

// 导入 进度条插件 的脚本和css
import NproGress from '../../node_modules/nprogress';
import 'nprogress/nprogress.css';


// 单独导入 message
import {Message} from 'element-ui';

// 导入 Vuex 中的 store对象
import store from '../store/index';


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
            path: '/', redirect: '/login',
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
            ],
            meta: {
                roles: ['超级管理员','管理员', '老师', '学生']
            }
        },
        // {
        //     path: '/index', redirect: '/index/chart',
        // },
        {
            // 创建登录 index 路由跳转
            path: '/index',
            component: index,
            meta: {
                roles: ['超级管理员','管理员', '老师', '学生']
            },
            children:children,
        },

    ],
});


router.beforeEach((to, form, next) => {
//     开启进度条
    NproGress.start();

    // 使用元信息，修改页面标题title
    const title = to.meta.title;
    if (title) {
        document.title = title;
    }

    // 首先判断 是否已经在login页面，防止页面无限叠加
    if (to.path !== '/login') {
        if (!getToken()) {
            //    如果token不存在，则跳转到login登录页面
            NproGress.done();
            next('/login');
            Message.error('您还未登录,请先登录!')
        } else {
            // 如果token 存在，则发送用户请求判断token是否正确
            getInfo().then(res => {
                console.log(res);
                if (res.data.data.status == 0) {

                    // 关闭进度条
                    NproGress.done();
                    next('/login');
                    Message.error('帐号以被禁用,请联系管理员!');
                } else {
                    if (res.data.code == 200) {

                        // 保存登录成功的用户信息
                        store.commit('setUser', {
                            username: res.data.data.username,
                            imgUrl: process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar
                        });


                        const role = res.data.data.role;

                        // 把角色信息保存到全局
                        store.commit('setRole',role);

                        // 判断 帐号的 角色是否存在
                        //如果 有权限,则说明可以访问
                        if(to.meta.roles.includes(role)){
                            // Message.success('登录成功!');
                            next();
                        }else{
                        //    如果 该 帐号，没有这个权限
                        //    禁止访问路由
                            // 如果正确则继续执行下面代码
                            Message.error('您的帐号权限无法访问!');
                            // 关闭进度条
                            NproGress.done();
                            next('/login');
                        }
                        console.log(res);
                    } else if (res.data.code == 206) {
                        // 如果token不正确，则返回login登录页面
                        // router.push('/login');
                        // next();
                        NproGress.done();
                        next('/login');
                        Message.error('您的用户错误!请重新登录!')
                    }else{
                        Message.error(res.data.message);
                    }

                }

            }).catch(err => {
                console.log(err);
            });
        }
    } else {
        next();
    }


});

router.afterEach(() => {

//    关闭进度条
    setTimeout(() => {
        NproGress.done();
    }, 120);
});


export {
    router,
    store
}