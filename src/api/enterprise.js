// 调入 自己的axios
import lineBashUrl from '../utils/myAxios';


// 获取 企业信息 列表 接口
const getEnterprise = (formData) => {
    return lineBashUrl({
        url: '/enterprise/list',
        params: formData,
    })
};

// 添加 企业信息 的 接口
const addEnterprise = (formData) => {
    return lineBashUrl({
        method: 'post',
        url: '/enterprise/add',
        params: formData,
    })
};


// 删除学科的 接口
const removeEnter = (id) => {
    return lineBashUrl({
        method: 'post',
        url: '/enterprise/remove',
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
        url: '/enterprise/status',
        data: {
            id,
            status
        },
    })
};


// 编辑学科内容 接口
const editEnterprise = (data) => {
    return lineBashUrl({
        method: 'post',
        url: '/enterprise/edit',
        data,
    })
};


// 暴露学科 的信息 接口
export {
    getEnterprise,
    addEnterprise,
    removeEnter,
    setStarStop,
    editEnterprise,
}










