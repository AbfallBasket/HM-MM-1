


// 验证手机的自定义规则
const validateTel = (rule, value, callback) => {
    if (value == '') {
        callback(new Error('请填写手机号码!'));
        console.log(process.env.VUE_APP_AGE);
    } else {
        let rexp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (rexp.test(value)) {
            callback();
        } else {
            callback(new Error('您的手机号码格式不正确!'));
        }
    }
};
// 验证密码的自定义规则
const validatePass = (rule, value, callback) => {
    if (value == '') {
        callback(new Error('请填写密码!'));
    } else {
        let rexp = /^[a-zA-Z]\w{5,17}$/;
        if (rexp.test(value)) {
            callback();
        } else {
            callback(new Error('密码必须字母开头，长度在6~18之间，只能包含字母、数字和下划线!'));
        }
    }
};

//暴露接口
export {
    validateTel,
    validatePass,
}