<template>
        <el-dialog
                :title="isEdit == false ? '新增学科':'编辑学科' "
                :visible.sync="dialogVisible"
                width="602px"
                center>

            <el-form :model="ruleForm" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">

                <el-form-item label="学科编号" prop="rid">
                    <el-input v-model="ruleForm.rid"></el-input>
                </el-form-item>

                <el-form-item label="学科名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="学科简称" prop="short_name">
                    <el-input type="textarea" v-model="ruleForm.short_name">

                    </el-input>
                </el-form-item>

                <el-form-item label="学科简介" prop="intro">
                    <el-input v-model="ruleForm.intro"></el-input>

                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cole">
                    取消
                </el-button>

                <el-button type="primary" @click="addSub">
                                确 定
                </el-button>
            </span>
        </el-dialog>
</template>

<script>


    // 编辑和 添加 学科的接口
    import {addSubject, editSubject} from "@/api/subject";


    export default {
        name: "addSub",
        data() {
            return {
                isEdit: false,

                page: null,
                totalPage: null,
                dialogVisible: false,
                ruleForm: {
                    id:'',
                    rid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: '',
                }, rules: {
                    rid: [
                        {required: true, message: '请输入学科编号!', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符之间!', trigger: 'blur'}
                    ], name: [
                        {required: true, message: '请输入学科名称!', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符之间!', trigger: 'blur'}
                    ],
                }
            }
        }, methods: {
            cole() {
                //    关闭面板
                this.dialogVisible = false;
                console.log('关闭面板了!');
            },
            addSub() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            console.log('我是编辑');

                            editSubject(this.ruleForm).then(res => {
                                console.log(res);
                                if (res.data.code == 200) {
                                    this.beforeSub();
                                    this.$message.success('编辑成功!');
                                    console.log(res);
                                } else if (res.data.code == 201) {
                                    this.$message.error(`${res.data.message}`);
                                } else {
                                    this.$message.error('编辑失败!');
                                }
                                console.log(res)
                            }).catch(err => {
                                console.log(err);
                            })
                        } else {
                            console.log('我是添加');
                            addSubject(this.ruleForm).then(res => {
                                console.log(res);
                                if (res.data.code == 200) {
                                    this.beforeSub();
                                    this.$message.success('添加成功!');
                                    console.log(res);
                                } else {
                                    this.$message.error(`${res.data.message}`);
                                }
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    } else {
                        // 不通过打印这个
                        this.$message.error('请将数据填写完整!');
                        return false;
                    }
                });


            },
            //    设置一个请求数据后，会关闭面板清空表单的方法
            beforeSub() {
                // 在当前页面中,重新请求数据
                this.page = this.$parent.currentPage1;
                this.totalPage = this.$parent.siziPage;
                this.$parent.isSearTemp(this.page, this.totalPage);

                //    关闭面板
                this.dialogVisible = false;
                //  注册后，重置表单数据
                // this.$refs.form.resetFields();
            }
        }
    }
</script>

<style lang="less">

</style>