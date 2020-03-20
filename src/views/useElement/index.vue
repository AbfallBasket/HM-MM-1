<template>


    <el-form class="formBox" ref="form" :model="formData" :rules="rules">
        <el-form-item prop="tel">
            <!-- 手机号码框 -->
            <el-input v-model="formData.tel" prefix-icon="el-icon-user
" placeholder="请输入手机号码" class="userTel" minlength="11" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item prop="pass">
            <!-- 密码框-->
            <el-input placeholder="请输入密码" v-model="formData.pass" show-password class="userPass"
                      prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item prop="veri">
            <el-row>
                <el-col :span="16">
                    <!--验证码 -->
                    <!--el-icon-key-->
                    <el-input placeholder="请输入验证码" v-model="formData.veri" class="userVeri" prefix-icon="el-icon-key"
                              minlength="4"
                              maxlength="4"></el-input>
                </el-col>
                <el-col :span="6" class="veri" :offset="1">
                    <!-- 验证码 组件视图 -->
                    <div class="loginVeri">
                        <img :src="veriUrl" alt="" @click="getNewUrl">
                    </div>


                </el-col>
            </el-row>
        </el-form-item>

        <!--协议框-->
        <el-form-item prop="checked">
            <span class="tk">
                <el-checkbox v-model="formData.checked" id="cheBox" name="userChe">
                    <el-link :underline="false" class="tp">我已阅读并同意</el-link>
                    <el-link class="ts" :underline="false">用户协议</el-link>
                    <el-link :underline="false" class="tp">和</el-link>
                    <el-link class="ts" :underline="false">隐私条款</el-link>

                </el-checkbox>

            </span>
        </el-form-item>


        <!-- 登录框-->
        <el-form-item>

            <el-button type="primary" class="login" @click="onSubmit">登录</el-button>
        </el-form-item>

        <!-- 注册按钮-->
        <el-form-item>

            <!-- 注册按钮组件-->

            <el-button @click="openRegiter" type="primary" class="register">
                注册
            </el-button>


        </el-form-item>


        <regiter ref="regiter">

        </regiter>

    </el-form>


</template>

<script>
    import regiter from '../login/regiter';

    //登录接口请求
    import {apiSetLogin} from '@/api/login';

    // 验证 手机和密码的 接口
    import {validateTel, validatePass} from '@/utils/myCheck';

    export default {
        name: "index",
        components: {
            regiter,
        },
        data() {
            return {
                // 登录验证码
                veriUrl:process.env.VUE_APP_BASEURL + '/captcha?type=login' + `&${Date.now()}`,
                formData: {
                    tel: '',
                    pass: '',
                    veri: '',
                    checked: [],
                }, rules: {

                    tel: [
                        {validator: validateTel, trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur'},

                    ], pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ], veri: [
                        {required: true, message: '验证码未输入!', trigger: 'blur'},
                        {min: 4, max: 4, message: '验证码必须为4位!', trigger: 'blur'},
                    ], checked: [
                        {type: 'array', required: true, message: '您未同意协议!', trigger: 'change'},
                    ]
                }
            };
        }, methods: {
            getNewUrl() {
                //点击切换验证码
                this.veriUrl = process.env.VUE_APP_BASEURL + '/captcha?type=login' + `&${Date.now()}`;
            },
            onSubmit() {
                //点击登录后，校验表单正确性
                // form.validate 校验整个表单属性
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 验证成功后，发送登录请求
                        apiSetLogin({
                            phone: this.formData.tel,
                            password: this.formData.pass,
                            code:this.formData.veri
                        }).then(res =>{

                            // 登录成功后的
                            console.log(res);

                        }).catch(err =>{
                            console.log(err);
                        });
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
            }, openRegiter() {
                // 点击注册按钮后，弹出注册框
                this.$refs.regiter.sidenUrl = process.env.VUE_APP_BASEURL + '/captcha?type=sendsms' + `&${Date.now()}`;

                this.$refs.regiter.centerDialogVisible = true;


            }

        }
    };
</script>

<style scoped lang="less">

    .formBox {
        margin-top: 20px;

        .el-col-offset-1{
            margin-left: 5% !important;
        }
        .loginVeri{
            width:110px;
            height:42px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .userVeri {
            width: 284px;
            height: 44px;
            .veri {
                width: 110px;
                height: 42px;
            }
        }
        #cheBox {
            color: #999999;
            font-size: 14px;
            line-height: 22px;
            .tk {
                display: inline-block;
            }
            .tp {
                color: #999999;
                &:hover {
                    color: #999999;
                }
            }
            .ts {
                color: #3296FA;
                line-height: 22px;
            }
        }

        .login, .register {
            font-size: 16px;
            width: 394px;
            height: 40px;
        }

        .code {
            float: right;
            /*margin-top: 25px;*/
            display: inline-block;
            width: 110px;

        }

    }


</style>