<template>
    <div class="myTable">


        <!-- 搜索 框 内容-->
        <el-card class="myForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searForm" size="small">

                <el-form-item label="用户名称">
                    <el-input style="width:100px;height:39px;" v-model="formInline.username">
                    </el-input>
                </el-form-item>

                <el-form-item label="用户邮箱">
                    <el-input v-model="formInline.email" style="width:140px;height:40px;">
                    </el-input>
                </el-form-item>


                <el-form-item label="角色状态">
                    <el-select class="normal" v-model="formInline.role_id" placeholder="角色">
                        <el-option label="所有" value="" selected></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clearForm">清空</el-button>
                </el-form-item>

                <el-form-item>

                    <el-button type="primary" @click="addUser">
                        <i class="el-icon-plus"></i>
                        新增用户
                    </el-button>

                </el-form-item>
            </el-form>

        </el-card>


        <el-card>
            <el-table

                    :data="tableData"
                    style="width: 100%"
                    border>

                <el-table-column
                        type="index"
                        label="序号">
                </el-table-column>

                <el-table-column
                        prop="username"
                        label="用户名">
                </el-table-column>

                <el-table-column
                        prop="phone"
                        label="电话">
                </el-table-column>

                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>

                <el-table-column
                        prop="role"
                        label="角色">
                </el-table-column>

                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>

                <el-table-column
                        label="状态"
                >
                    <template slot-scope="props">
                <span :class="{activeRed:(props.row.status == 1 ? false : true)}">
                    {{(props.row.status == 1)?'启用':'禁用' }}
                </span>
                    </template>

                </el-table-column>

                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="props">
                        <el-button type="text" size="small" @click="editUser(props.row)">编辑</el-button>

                        <el-button type="text" size="small" @click="starStop(props.row)">
                            {{(props.row.status == 0)?'启用':'禁用' }}
                        </el-button>

                        <el-button v-if="['管理员','超级管理员'].includes($store.state.role)" type="text" size="small" @click="removeUser(props.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>


            <div class="subList">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-sizes="[3,4,5,6]"
                        :page-size="siziPage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>

            </div>

        </el-card>

        <!-- 添加用户的 子组件-->
        <userAdd ref="useradd">


        </userAdd>


    </div>
</template>

<script>


    // 获取用户 操作用户的接口
    import {getUserInfo, removeUser, setStatStop} from "@/api/user";

    // 引入添加用户接口
    import userAdd from './userAdd';


    export default {
        name: "user",
        components: {
            userAdd
        },
        data() {
            return {
                activeRed: '',

                getInfoTemp: this.getInfo,

                currentPage1: 1,
                total: 0,
                siziPage: 3,

                formInline: {
                    // 邮箱
                    email: '',
                    // 状态
                    role_id: '',
                    // 用户名称
                    username: ''
                },

                tableData: [],
            }
        }, methods: {
            starStop(row) {
                setStatStop(row.id, row.status).then(res => {


                    if (res.data.code == 200) {


                        this.getInfoTemp(this.currentPage1, this.siziPage);

                        if (this.tempStatus == 0) {
                            this.$message.error('禁用成功!');
                        } else {
                            this.$message.success('启用成功!');
                        }
                    } else {
                        this.$message.error('修改失败!');
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            removeUser(row) {
                if (this.tableData.length == 1 && this.currentPage1 != 1) {
                    console.log('此时只有一条数据!');
                    // 在只有一条数据,而且是第一页的情
                    // 况下 不需要 当前页数 -1 否则报错
                    this.currentPage1--;
                }
                // 删除用户
                removeUser(row.id).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        // 删除成功后，刷新当前页
                        this.$message.success('删除成功!');
                        this.getInfoTemp(this.currentPage1, this.siziPage);

                    } else {
                        this.$message.success('删除失败!');
                    }
                }).catch(err => {
                    console.log(err);
                })

            },
            addUser() {
                //    添加用户
                // 假如是添加用户，则把编辑id清除
                this.$refs.useradd.isEdit = false;

                this.$refs.useradd.dialogVisible = true;
                this.$refs.useradd.$nextTick(() => {
                    this.$refs.useradd.$refs.ruleForm.resetFields();
                });


            },
            editUser(row) {

                this.$refs.useradd.dialogVisible = true;
                this.$refs.useradd.isEdit = true;
                //    这是点击编辑页面后，执行的代码
                // 点击后，把id传递给编辑页面
                // 把 要编辑的内容 传递给 编辑框
                this.$refs.useradd.$nextTick(() => {
                    this.$refs.useradd.userForm = JSON.parse(JSON.stringify(row));
                });
                // 打开编辑学科

                console.log('编辑用户');
            },
            onSubmit() {
                //    这是点击搜索后

                this.total = 1;

                this.getInfoTemp();

                console.log('我点击了搜索!');

            },
            clearForm() {
                this.formInline.role_id = '';
                this.$refs.searForm.resetFields();
                // 清空表单后
                this.total = 1;
                this.getInfoTemp();

            },
            handleSizeChange(sizePage) {
                // 这个是选择每页显示多少条的点击事件

                // 点击后，把用户选择每页显示多少条的数据
                // 赋值给默认每页显示 10 的变量
                // 然后重新请求 当前页显示的 数据
                this.siziPage = sizePage;

                this.getInfoTemp(this.page, this.siziPage);

            },
            handleCurrentChange(page) {

                this.currentPage1 = page;
                // 这个点击事件是 点击第几页的
                // 所以需要加上一个点击时，请求每页具体多少条
                // 数据的 this.siziPage
                this.getInfoTemp(page, this.siziPage);

                console.log(`每页 ${this.siziPage} 条`);
                console.log(`当前页:  ${this.currentPage1} 页`);
                console.log(`当前选择第 ${page} 页`);

            },

            // 这个为 默认的 请求数据的接口
            getInfo(page = 1, siziPage = 3) {
                getUserInfo({
                    page: page,
                    limit: siziPage,
                    ...this.formInline
                }).then(res => {
                    if (res.data.code == 200) {

                        this.tableData = res.data.data.items;
                        this.total = res.data.data.pagination.total;
                        console.log(res);
                    }

                }).catch(err => {

                    console.log(err);
                })

            },

        }, created() {
            this.getInfoTemp();
        }
    }
</script>

<style scoped lang="less">


</style>