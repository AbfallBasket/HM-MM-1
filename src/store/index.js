
// 导入Vue
import Vue from 'vue';

// 导入Vuex
import Vuex from '../../node_modules/vuex';

// 注册全局Vuex
Vue.use(Vuex);

// 设置store对象
const store = new Vuex.Store({
    // 用来管理数据
    state:{
        // 调用数据 使用 this.$store.state.name
        name:'xjj',
        username:'',
        imgUrl:'',
        role:'', //用户角色
    },
    mutations:{
        changeName : (state,params) =>{
            // 定义 changeName 修改这个 数据
            state.name = params.name;
        }
    //    方法名：为上面这个定义的方法名
    //    调用这个方法 this.$store.commit('changeName');
        ,setUser:(state,info)=>{
            state.username = info.username;
            state.imgUrl = info.imgUrl;
        },

        setRole:(state,payload) =>{
            state.role = payload;
        }

    }
});

export default store;

