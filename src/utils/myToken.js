




//设置默认的 token 的key值
const TOKEN_KEY = 'heimamm';

// 设置 token
const setToken = (val) =>{
    window.localStorage.setItem(TOKEN_KEY,val);
};
// 获取token
const getToken = () =>{
    return window.localStorage.getItem(TOKEN_KEY);
};

// 删除token
const removeToken = () =>{
    window.localStorage.removeItem(TOKEN_KEY);
};

export {
    setToken,
    getToken,
    removeToken,
}

























