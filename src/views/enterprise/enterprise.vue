<template>
    <div class="myTable">


        <!--<div class="myForm">-->
        <el-card class="myForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searForm" size="small">

                <el-form-item label="企业编号" prop="eid">
                    <el-input style="width:100px;height:39px;" v-model="formInline.eid">
                    </el-input>
                </el-form-item>

                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="formInline.name" style="width:140px;height:40px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="创建者" prop="username">
                    <el-input v-model="formInline.username" style="width:100px;height:39px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-select v-model="formInline.status" placeholder="请选择状态">
                        <el-option selected label="所有" value="">
                        </el-option>
                        <el-option label="启用" :value="1">
                        </el-option>
                        <el-option label="禁用" :value="0">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clearForm">清除</el-button>
                </el-form-item>

                <el-form-item>

                    <el-button type="primary" @click="addSubject">
                        <i class="el-icon-plus"></i>
                        新增企业
                    </el-button>

                </el-form-item>


            </el-form>
        </el-card>

        <!--</div>-->

        <el-card>
            <el-table
                    :data="subjectList"
                    style="width: 100%"
            >
                <el-table-column
                        type="index"
                        label="序号"
                        width="80">
                </el-table-column>

                <el-table-column
                        prop="eid"
                        label="企业编号">
                </el-table-column>

                <el-table-column
                        prop="short_name"
                        label="企业名称">
                </el-table-column>

                <el-table-column
                        prop="username"
                        label="创建者">
                </el-table-column>

                <el-table-column
                        label="创建日期">
                    <template slot-scope="props">
                        <span>{{props.row.create_time  | myTime}}</span>
                    </template>
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
                        <el-button type="text" @click="editSub(props.row)" size="small">编辑</el-button>

                        <el-button type="text" size="small" @click="starStop(props.row)">
                            {{(props.row.status == 0)?'启用':'禁用' }}
                        </el-button>

                        <el-button type="text" size="small" @click="removeSub(props.row)">删除</el-button>
                    </template>

                </el-table-column>


            </el-table>
            <div class="subList">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-sizes="[2,4,5,6]"
                        :page-size="siziPage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>

            </div>
        </el-card>


        <addEnter ref="add">

        </addEnter>

    </div>
</template>

<script>

    // 获取 表格信息 接口
    import {getEnterprise, removeEnter, setStarStop} from "@/api/enterprise";

    // 添加学科的组件
    import addEnter from './enterAdd';

    export default {
        name: "enterprise",
        components: {
            addEnter
        },
        data() {
            return {
                msg: '',
                subjectList: [],
                myStatus: '',

                currentPage1: 1,
                total: 0,
                siziPage: 2,

                isActive: true,

                formInline: {
                    //企业名称
                    name: '',
                    // 企业id
                    eid: '',
                    // 状态
                    status: '',
                    // 创建者名
                    username: ''
                },


                //    临时方法,判断是搜索还是普通的
                isSearTemp: this.getMyTable,
            }
        }, methods: {
            editSub(row) {
                // 打开编辑 企业
                this.$refs.add.dialogVisible = true;
                // 点击后，把id传递给编辑页面
                this.$refs.add.isEdit = true;
                // 把 要编辑的内容 传递给 编辑框
                this.$refs.add.$nextTick(() => {
                    this.$refs.add.subForm = JSON.parse(JSON.stringify(row));
                });
                console.log('编辑企业');
            },
            starStop(row) {
                setStarStop(row.id, row.status)
                    .then(res => {
                        console.log(res);

                        if (res.data.code == 200) {
                            //    修改成功,刷新页面,弹框
                            this.isSearTemp(this.currentPage1, this.siziPage);

                            if (this.tempStatus == 0) {
                                this.$message.error('禁用成功!');
                            } else {
                                this.$message.success('启用成功!');
                            }
                        } else {
                            this.$message.error('修改失败!');

                        }

                    }).catch(err => {

                    console.log(err);

                });
            },
            removeSub(row) {
                console.log(row.id);
                // 点击后，判断 数据是否只有一条

                if (this.subjectList.length == 1 && this.currentPage1 != 1) {
                    console.log('此时只有一条数据!');
                    // 在只有一条数据,而且是第一页的情况下
                    // 不需要 当前页数 -1 否则报错
                    this.currentPage1--;
                }
                removeEnter(row.id).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        // 删除成功后，刷新当前页
                        this.$message.success('删除成功!');

                        this.isSearTemp(this.currentPage1, this.siziPage);
                    }

                }).catch(err => {

                    console.log(err);

                });

            },
            addSubject() {
                this.$refs.add.dialogVisible = true;

                console.log('添加企业');

                // 假如是添加学科，则把编辑id清除
                this.$refs.add.isEdit = false;

                this.$refs.add.$nextTick(() => {
                    this.$refs.add.$refs['ruleForm'].resetFields();
                });
            },
            clearForm() {
                //    清空表单
                this.$refs.searForm.resetFields();

                // 返回第一页
                this.isSearTemp();
                this.total = 1;

            },
            onSubmit() {
                // 搜索功能，点击搜索后
                // 发送请求的数据的 列表进行显示

                this.total = 1;
                this.isSearTemp();
                console.log('我点击了搜索!');


            },
            handleSizeChange(sizePage) {
                // 这个是选择每页显示多少条的点击事件

                // 点击后，把用户选择每页显示多少条的数据
                // 赋值给默认每页显示 10 的变量
                // 然后重新请求 当前页显示的 数据
                this.siziPage = sizePage;

                this.isSearTemp(this.currentPage1, this.siziPage);

            },
            handleCurrentChange(page) {

                this.currentPage1 = page;
                // 这个点击事件是 点击第几页的
                // 所以需要加上一个点击时，请求每页具体多少条
                // 数据的 this.siziPage
                this.isSearTemp(page, this.siziPage);

                console.log(`每页 ${this.siziPage} 条`);
                console.log(`当前页:  ${this.currentPage1} 页`);
                console.log(`当前选择第 ${page} 页`);

            },
            getMyTable(page = 1, siziPage = 2) {
                getEnterprise({
                    page: page,
                    limit: siziPage,
                    ...this.formInline
                }).then(res => {
                    console.log(res);

                    // 把 表格数据存到 变量中
                    this.subjectList = res.data.data.items;

                    this.total = res.data.data.pagination.total;

                }).catch(err => {
                    console.log(err);
                })
            }
        }, mounted() {
            //    进入界面请求 学科列表
            this.isSearTemp();

        }
    }
</script>

<style scoped lang="less">


</style>





