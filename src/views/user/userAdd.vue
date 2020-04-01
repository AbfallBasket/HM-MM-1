<template>
    <div>
        <el-dialog
                :title="isEdit == false ? '新增用户' : '编辑用户'"
                :visible.sync="dialogVisible"
                width="602px"
                center>

            <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>

                <el-form-item label="电话" prop="phone">
                    <el-input maxlength="11" minlength="11" v-model="userForm.phone">

                    </el-input>
                </el-form-item>

                <el-form-item label="角色" prop="role_id">
                    <el-select class="normal" v-model="userForm.role_id" placeholder="请选择角色" >
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="状态" prop="status">
                    <el-select class="normal" v-model="userForm.status" placeholder="请选择状态">
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="禁用" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="用户备注" prop="remark">
                    <el-input v-model="userForm.remark"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cole">
                    取消
                </el-button>

                <el-button type="primary" @click="addUser">
                                确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import {addUser,apiEditUser} from "@/api/user";


    import {validateEmail, validateTel} from "@/utils/myCheck";

    export default {
        name: "userAdd",
        data() {
            return {
                isEdit:'',

                msg: '',
                dialogVisible: false,

                page:null,
                totalPage:null,

                userForm: {
                    username: '',
                    email: '',
                    phone: '',
                    role_id: '',

                    status: '',
                    remark: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名!', trigger: 'blur'},
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur'}, {
                            required: true,
                            message: '请填写邮箱号码!',
                            trigger: 'blur'
                        },
                    ], phone: [
                        {validator: validateTel, trigger: 'blur'}, {
                            required: true,
                            message: '请填写手机号码!',
                            trigger: 'blur'
                        },
                        {min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '请选择角色!', trigger: 'blur'},
                    ],
                }

            }
        }, methods: {
            cole() {
                //    关闭面板
                this.dialogVisible = false;

            },
            addUser() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {

                        if(this.isEdit == false){
                            // 添加 用户
                            //    表单校验成功后发送请求
                            addUser(this.userForm).then(res => {
                                console.log(res);
                                if (res.data.code == 200) {
                                    // this.$parent.currentPage1 = 1;
                                 //   重新加载，关闭页面
                                 this.beforeLoading();

                                    this.$message.success('新增成功!');
                                } else {
                                    this.$message.error(`${res.data.message}`);
                                }

                            }).catch(err => {
                                console.log(err);
                            })

                        }else{
                        //    如果id存在，则说明是编辑
                            apiEditUser(this.userForm).then(res =>{

                                if(res.data.code == 200){
                                    //   重新加载，关闭页面
                                    this.beforeLoading();

                                    this.$message.success('编辑成功!');

                                }else if(res.data.code == 201){
                                    this.$message.error(`${res.data.message}`);
                                }else{
                                    this.$message.error(`编辑失败!`);
                                }
                                console.log(res);


                            }).catch(err =>{
                                console.log(err);

                            })


                        }

                    }else{
                        this.$message.error('请将数据填写完整!');
                        return false;
                    }
                })
            },
            beforeLoading(){

                // 重新加载 页面 数据
                this.page = this.$parent.currentPage1;
                this.totalPage = this.$parent.siziPage;
                this.$parent.getInfoTemp(this.page, this.totalPage);

                //    关闭面板
                this.dialogVisible = false;
                //  注册后，重置表单数据
                // this.$refs.ruleForm.resetFields();
            }
        }

    }
</script>

<style lang="less">



</style>