



// 调入 自己的axios
import lineBashUrl from '../utils/myAxios';




//  题库列表 获取 接口

const apiGetQuestion = (formData) => {
    return lineBashUrl({
        url: '/question/list',
        params: formData,
    })
};




export {
    apiGetQuestion,

}


