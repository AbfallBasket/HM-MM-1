

// 导入 axios包
import axios from 'axios';

import {getToken} from "./myToken";

//  设置 主页的基地址axios
let lineBashUrl = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true,
});

lineBashUrl.interceptors.request.use((config) => {
    console.log('请求拦截器');

    if(getToken()){
        // 给 设置全局的 token值
        config.headers.common['token'] = getToken();
        // config.headers.token = getToken()
    }

    // config 包含了所有浏览器的相关信息
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default lineBashUrl
