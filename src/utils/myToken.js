




//设置默认的 token 的key值
const TOKEN_KEY = 'heimamm';

// 设置 token
const setToken = (val) =>{
    window.localStorage.setItem(TOKEN_KEY,String(val));
};
// 获取token
const getToken = (val) =>{
    window.localStorage.getItem(TOKEN_KEY,String(val));
};

// 删除token
const removeToken = (val) =>{
    window.localStorage.removeItem(TOKEN_KEY,String(val));
};

export {
    setToken,
    getToken,
    removeToken,
}

























