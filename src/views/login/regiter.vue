<template>
    <el-dialog
            title="用户注册"
            :visible.sync="centerDialogVisible"
            width="603px"
            center :show-close="false" modal class="registerBox"
    >
        <el-form :hide-required-asterisk="hideRed" label-width="80px" :model="formDate" :rules="rules" ref="form">
            <el-form-item label="昵称" prop="name">
                <el-input v-model="formDate.name" name="name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formDate.email" name="email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="tel">
                <el-input v-model="formDate.tel" name="tel" minlength="11" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input show-password v-model="formDate.pass" name="pass"></el-input>
            </el-form-item>

            <el-form-item label="图形码" prop="veri">
                <el-row>
                    <el-col :span="16" style="padding-left:0;">
                        <!--验证码 -->
                        <!--el-icon-key-->
                        <el-input placeholder="请输入图形码" v-model="formDate.veri"
                                  minlength="4"
                                  maxlength="4" name="veri">

                        </el-input>
                    </el-col>
                    <el-col class="mySiden" :span="4" :offset="1" style="z-index: 9999;
">
                        <!-- 验证码 组件视图 -->

                        <siden>

                        </siden>


                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="验证码" prop="userVeri">
                <el-row>
                    <el-col :span="16" style="padding-left:0;">
                        <!--验证码 -->
                        <!--el-icon-key-->
                        <el-input placeholder="请输入验证码" v-model="formDate.userVeri"
                                  minlength="4"
                                  maxlength="4" name="userVeri">

                        </el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">

                        <el-button class="userVeri">获取用户验证码</el-button>

                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">

            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onRegiter">确 定</el-button>

          </span>
    </el-dialog>


</template>

<script>

    import siden from '../iden/siden';

    export default {
        name: "regiter",
        components:{
            siden
        },
        data() {
            let validateTel = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请填写手机号码!'));
                } else {
                    let rexp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                    if (rexp.test(value)) {
                        callback();
                    } else {
                        callback(new Error('您的手机号码格式不正确!'));
                    }
                }
            };

            let validateEmail = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请填写邮箱号码!'));
                } else {
                    let rexp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    if (rexp.test(value)) {
                        callback();
                    } else {
                        callback(new Error('您的邮箱格式不正确!'));
                    }
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请填写密码!'));
                } else {
                    let rexp = /^[a-zA-Z]\w{5,17}$/;
                    if (rexp.test(value)) {
                        console.log('dd');
                        callback();
                    } else {
                        console.log('www');
                        callback(new Error('密码必须字母开头，长度在6~18之间，只能包含字母、数字和下划线!'));
                    }
                }
            };
            return {
                centerDialogVisible: false,
                hideRed: false,
                formDate: {
                    name: '',
                    email: '',
                    tel: '',
                    pass: '',
                    veri: '',
                    userVeri: '',
                }, rules: {
                    name: [
                        {required: true, message: '昵称必须填写!', trigger: 'blur'},
                        {min: 2, message: '昵称最少俩位', trigger: 'blur'}
                    ], email: [
                        {validator: validateEmail, trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ], tel: [
                        {validator: validateTel,trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur'}
                    ], pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ], veri: [
                        {required: true, message: '验证码未输入!', trigger: 'blur'},
                        {min: 4, max: 4, message: '验证码必须为4位!', trigger: 'blur'},
                    ], userVeri: [
                        {required: true, message: '用户验证码未输入!', trigger: 'blur'},
                        {min: 4, max: 4, message: '用户验证码必须为4位!', trigger: 'blur'}
                    ]
                }
            };
        }, methods: {
            onRegiter() {
                // this.centerDialogVisible = false;
                // form.validate 校验整个表单属性
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 表单提交符合的时候打印
                        this.$message({
                            type: 'success',
                            message: '验证通过!',
                        })

                    } else {
                        // 不通过打印这个
                        this.$message.error('数据有误,请重新输入!');
                        return false;
                    }
                })
            }
        }
    }

</script>

<style lang="less">

    .registerBox {
        overflow: hidden;

        .code {
            /*margin-top: 25px;*/
            display: inline-block;
            width: 110px;
            height: 40px;
            .s-canvas {
                width: 110px;
                height: 40px;
            }

        }

        .register {
            font-size: 16px;
            width: 394px;
            height: 40px;
            margin-left: 0 !important;
        }

        .el-form-item {
            margin-bottom: 22px;
        }

        .el-dialog__header {
            background: blue;
        }

        .mySiden{
            width:137px;
            height:41px;
        }
        .el-col-16 {
            padding-left: 0;
        }
        .el-dialog__header {
            padding: 0;
            height: 53px;
            line-height: 53px;
            background: linear-gradient(225deg, #1396fd, #02c6fc);
            span {
                color: white;
                font-size: 24px;
            }

        }
    }
</style>