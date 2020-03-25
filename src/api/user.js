


// 调入 自己的axios
import lineBashUrl from '../utils/myAxios';



// 获取 用户信息 接口
const getUserInfo = (formData) => {
    return lineBashUrl({
        url: '/user/list',
        params: formData,
    })
};


// 设置 用户 状态 接口
const setStatStop = (id,status) => {
    return lineBashUrl({
        method:'post',
        url: '/user/status',
        data:{
            id,
            status
        } ,
    })
};


// 删除用户  接口
const removeUser = (id) => {
    return lineBashUrl({
        method:'post',
        url: '/user/remove',
        data:{
            id
        },
    })
};


// 添加用户 接口
const addUser = (data) => {
    return lineBashUrl({
        method:'post',
        url: '/user/add',
        data
    })
};



// 编辑用户 接口
const apiEditUser = (data) => {
    return lineBashUrl({
        method:'post',
        url: '/user/edit',
        data
    })
};





export {
    getUserInfo,
    setStatStop,
    removeUser,
    addUser,
    apiEditUser
}



