<template>
    <el-dialog
            title="用户注册"
            :visible.sync="centerDialogVisible"
            width="603px"
            top="50px"
            center :show-close="false" modal class="registerBox"
    :close-on-click-modal="false"
    >
        <el-form :hide-required-asterisk="hideRed" label-width="80px" :model="formDate" :rules="rules" ref="form">

            <!-- 上传头像 -->
            <el-form-item label="头像" prop="avatar">
                <el-upload
                        class="avatar-uploader"
                        :action="activeImg"
                        name="image"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture">

                    <img v-if="image" :src="image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">

                    </i>
                </el-upload>

            </el-form-item>

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
                    <el-col :span="4" :offset="1" style="z-index: 9999;
">
                        <!-- 验证码 组件视图 -->

                        <div class="mySiden">
                            <img :src="sidenUrl" alt="" @click="getNewUrl">
                        </div>


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
                    <el-col :span="4" :offset="1" class="uerBtn">

                        <el-button :disabled="time !== 0" class="userVeri" @click="getUserVeri">
                            {{time == 0 ? '获取用户验证码' : time}}
                        </el-button>

                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">

            <el-button @click="reset">取 消</el-button>
            <el-button type="primary" @click="onRegiter">确 定</el-button>

          </span>
    </el-dialog>


</template>

<script>

    // 注册用户 的接口请求
    import {apiGetCode, apiSetUser,} from '@/api/register';

    // 验证 手机和密码的 接口
    import {validateTel, validatePass,validateEmail} from '@/utils/myCheck';

    // @ 可以代替 src目录


    export default {
        name: "regiter",
        data() {

            return {
                centerDialogVisible: false,
                hideRed: false,
                sidenUrl: process.env.VUE_APP_BASEURL + '/captcha?type=sendsms' + `&${Date.now()}`,
                time: 0,
                timer: '',
                disabled: false,
                image: '',
                activeImg: process.env.VUE_APP_BASEURL + '/uploads',
                formDate: {
                    name: '',
                    email: '',
                    tel: '',
                    pass: '',
                    userVeri: '',
                    avatar: '',
                    veri: '',
                },
                rules: {
                    avatar: [
                        {required: true, message: '请选择头像!', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '昵称必须填写!', trigger: 'blur'},
                        {min: 2, message: '昵称最少俩位', trigger: 'blur'}
                    ], email: [
                        {validator: validateEmail, trigger: 'blur'}, {
                            required: true,
                            message: '请填写邮箱号码!',
                            trigger: 'blur'
                        },
                    ], tel: [
                        {validator: validateTel, trigger: 'blur'}, {
                            required: true,
                            message: '请填写手机号码!',
                            trigger: 'blur'
                        },
                        {min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur'}
                    ], pass: [
                        {validator: validatePass, trigger: 'blur'},
                        {required: true, message: '请填写密码!', trigger: 'blur'},
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
            reset() {
                //  点击取消按钮后，重置表单数据
                this.$refs.form.resetFields();

                //  清除图片路径
                this.image = null;
                //    关闭面板
                this.centerDialogVisible = false;

            },
            handleAvatarSuccess(res, file) {
                this.image = URL.createObjectURL(file.raw);
                console.log(res);

                // 把路径赋值给 表单元素，后面注册提交用
                this.formDate.avatar = res.data.file_path;

                console.log(this.formDate.avatar);

                //    由于头像上传后，无法更新校验属性
                //    所以需要单独校验 图片属性
                this.$refs.form.validateField('avatar');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/png/gif 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getNewUrl() {
                // 点击图片 重新获取图片验证码
                this.sidenUrl = process.env.VUE_APP_BASEURL + '/captcha?type=sendsms' + `&${Date.now()}`;
            },
            onRegiter() {
                // form.validate 校验整个表单属性
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 点击确认，发送注册请求
                        apiSetUser({
                            username: this.formDate.name,
                            phone: this.formDate.tel,
                            email: this.formDate.email,
                            avatar: this.formDate.avatar,
                            password: this.formDate.pass,
                            rcode: this.formDate.userVeri,
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$message.success('注册成功!');
                                //  注册后，重置表单数据
                                this.$refs.form.resetFields();
                                //    关闭面板
                                this.centerDialogVisible = false;
                                //  清除图片路径
                                this.image = null;


                                console.log(res);

                            } else {

                                this.$message.error('注册失败！');
                            }
                        }).catch(err => {
                            console.log(err);
                        })


                    } else {
                        // 不通过打印这个
                        this.$message.error('请将数据填写完整后提交!');
                        return false;
                    }
                });


            }, getUserVeri() {

                if (this.formDate.tel.trim() == '') {
                    this.$message.error('请先输入手机号码!');
                    return;
                } else if (this.formDate.veri.trim() == '') {
                    this.$message.error('请输入图形验证码!');
                    return;
                }

                // 发送 手机验证码的 组件接口方法
                apiGetCode({
                    code: this.formDate.veri,
                    phone: this.formDate.tel,
                }).then(res => {
                    console.log('dd');
                    console.log(res);
                    if (res.data.message == '验证码错误') {
                        this.$message.error('图形验证码错误!请重新输入！');
                        return;
                    } else {
                        if (res.data.code == 200) {
                            this.$message.success('手机验证码发送成功!');
                            // 设置点击后1分钟倒计时中，无法重复点击
                            this.time = 60;
                            this.timer = setInterval(() => {
                                if (this.time > 0) {
                                    this.time--;
                                } else if (this.time === 0) {
                                    clearInterval(this.timer);
                                }
                            }, 100);
                        } else {
                            // 如果手机已注册，返回错误
                            this.$message.error(res.data.message);
                            return;
                        }
                    }

                }).catch(err => {
                    console.log(err);
                })

            }
        }
    }

</script>

<style lang="less">

    .registerBox {
        /*overflow: hidden !important;*/

        .avatar-uploader {
            margin: 0 auto;
            display: flex;
            justify-content: center;
            .el-upload {
                margin: 0 auto;
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .el-upload:hover {
                border-color: #409EFF;
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

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

        .mySiden {
            width: 137px;
            height: 41px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .el-col-16 {
            padding-left: 0;
        }

        .uerBtn, .userVeri {
            width: 137px;
            height: 40px;

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