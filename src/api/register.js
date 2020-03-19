// 封装注册接口

import axios from '../../node_modules/axios';


// 设置一个axios的基地址
let lineBashUrl = axios.create({
    baseURL:process.env.VUE_APP_BASEURL
});


// 发送手机验证码的api
const apiGetCode = ({code, phone}) => {
    return lineBashUrl({
        url: '/sendsms',
        method: 'post',
        data: {
            code: code,
            phone: phone,
        },
        withCredentials: true,
    })
};
//注册api
const apiSetUser = (formData) =>{
    return lineBashUrl({
        url:'/register',
        method:'post',
        data:formData,
        withCredentials: true,
    })
};


export {
    apiGetCode,
    apiSetUser,
}
