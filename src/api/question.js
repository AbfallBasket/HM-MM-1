



// 调入 自己的axios
import lineBashUrl from '../utils/myAxios';




//  题库列表 获取 接口

const apiGetQuestion = (formData) => {
    return lineBashUrl({
        url: '/question/list',
        params: formData,
    })
};

//  题库 状态 改变 接口
const apiStarStop = (id,status) => {
    return lineBashUrl({
        method:'post',
        url: '/question/status',
        data: {
            id,
            status
        },
    })
};


//  删除 题库  接口
const apiRemoveQues = (id) => {
    return lineBashUrl({
        method:'post',
        url: '/question/remove',
        data: {
            id
        },
    })
};

//  添加 题库  接口
const apiAddQues = (data) => {
    return lineBashUrl({
        method:'post',
        url: '/question/add',
        data
    })
};


//  编辑 题库  接口
const apiEditQues = (data) => {
    return lineBashUrl({
        method:'post',
        url: '/question/edit',
        data
    })
};





export {
    apiGetQuestion,
    apiStarStop,
    apiRemoveQues,
    apiAddQues,
    apiEditQues
}


