


// 导入 axios包
import axios from 'axios';

// 导入token包
import {getToken} from "../utils/myToken";


//  设置 主页的基地址axios
let lineBashUrl = axios.create({
    baseURL:process.env.VUE_APP_BASEURL,
    withCredentials:true,
});


// 登录时 获取用户信息
const getInfo = () =>{
    return lineBashUrl({
        url:'/info',
        headers:{
            token:getToken(),
        }
    })
};
// 登录时 获取用户信息
const logout = () =>{
    return lineBashUrl({
        url:'/logout',
        headers:{
            token:getToken(),
        }
    })
};



// 获取 学科列表接口
const getSubject = (formData) =>{
    return lineBashUrl({
        url:'/subject/list',
        params:formData,
        headers:{
            token:getToken(),
        }
    })
};






// 暴露接口
export {
    getInfo,
    logout,
    getSubject,
}







