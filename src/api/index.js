


// 导入 axios包
import axios from 'axios';

// 导入token包
import {getToken} from "../utils/myToken";

let lineBashUrl = axios.create({
    baseURL:process.env.VUE_APP_BASEURL,
    withCredentials:true,
});


const getInfo = () =>{
    return lineBashUrl({
        method:'get',
        url:'/info',
        headers:{
            token:getToken(),
        }
    })
};

export {
    getInfo,
}







