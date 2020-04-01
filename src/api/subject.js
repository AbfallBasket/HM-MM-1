

// 调入 自己的axios
import lineBashUrl from '../utils/myAxios';


// 获取 学科列表接口
const getSubject = (formData) => {
    return lineBashUrl({
        url: '/subject/list',
        params: formData,
    })
};

// 添加学科的 接口
const addSubject = (formData) => {
    return lineBashUrl({
        method: 'post',
        url: '/subject/add',
        params: formData,
    })
};


// 删除学科的 接口
const removeSubject = (id) => {
    return lineBashUrl({
        method: 'post',
        url: '/subject/remove',
        data: {
            id
        },
    })
};

// 设置学科状态的 启用和禁用接口
// starStop
const setStarStop = (id, status) => {
    return lineBashUrl({
        method: 'post',
        url: '/subject/status',
        data: {
            id,
            status
        },
    })
};


// 编辑学科内容 接口
const editSubject = (data) => {
    return lineBashUrl({
        method: 'post',
        url: '/subject/edit',
        data,
    })
};
// 暴露学科 的信息 接口
export {
    getSubject,
    addSubject,
    removeSubject,
    setStarStop,
    editSubject,
}























