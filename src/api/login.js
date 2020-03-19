

// 导入axios包
import axios from '../../node_modules/axios';


// 设置一个axios的基地址
let lineBashUrl = axios.create({
    baseURL:process.env.VUE_APP_BASEURL
});

// 要把这个设置基地址的axios对象使用
//登录 请求api
const apiSetLogin = (formData) =>{
    return lineBashUrl({
        url:'/login',
        method:'post',
        data:formData,
        withCredentials: true,
    })
};

export {
    apiSetLogin
}