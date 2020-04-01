<template>
    <div class="myTable">


        <!-- 搜索 框 内容-->
        <el-card class="myForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" size="small">

                <el-form-item  label="学科" prop="subject">

                    <subSelCom style="width: 150px;" :value="formInline.subject" @input="val => (formInline.subject = val)">
                    </subSelCom>

                </el-form-item>

                <el-form-item label="阶段" prop="step">
                    <el-select style="width:150px;" class="normal" v-model="formInline.step" placeholder="请选择阶段">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="初级" :value="1"></el-option>
                        <el-option label="中级" :value="2"></el-option>
                        <el-option label="高级" :value="3"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="企业" prop="enterprise">
                    <enterCom style="width: 150px;" :value="formInline.enterprise" @input="val => (formInline.enterprise = val)">
                    </enterCom>
                </el-form-item>


                <el-form-item label="题型" prop="type">
                    <el-select style="width:150px;" class="normal" v-model="formInline.type" placeholder="请选择题型">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="单选" :value="1"></el-option>
                        <el-option label="多选" :value="2"></el-option>
                        <el-option label="简答" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="难度" prop="difficulty">
                    <el-select style="width:150px;" class="normal" v-model="formInline.difficulty" placeholder="请选择题型">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="简单" :value="1"></el-option>
                        <el-option label="一般" :value="2"></el-option>
                        <el-option label="困难" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="作者" prop="username">
                    <el-input
                            v-model="formInline.username"
                            placeholder="审批人"
                            style="width:150px;"
                    ></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-select style="width:150px;" class="normal" v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="禁用" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="日期" prop="create_date">
                    <el-date-picker
                            v-model="formInline.create_date"
                            type="date"
                            placeholder="选择日期"
                            style="width:150px;"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item class="title-item" label="标题" prop="title">
                    <el-input style="width:383px;"
                              v-model="formInline.title"
                              placeholder="输入标题"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clearForm">清空</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addQuestion">
                        <i class="el-icon-plus"></i>
                        新增试题
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

                <el-table-column label="题目" width="200">
                    <template slot-scope="props">
                        <span v-html="props.row.title">
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="学科.阶段">
                    <template slot-scope="props">
                        <span>
                            {{props.row.subject_name}}
                            .
                            {{{1:'初级',2:'中级',3:'高级'}[props.row.step]}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="题型">
                    <template slot-scope="props">
                        {{{ 1: '单选', 2: '多选', 3: '简答' }[props.row.type]}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="enterprise_name"
                        label="企业">
                </el-table-column>

                <el-table-column
                        prop="username"
                        label="创建者">
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
                        prop="reads"
                        label="访问量">
                </el-table-column>


                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="props">
                        <el-button type="text" size="small" @click="questioinEdit(props.row)">编辑</el-button>

                        <el-button type="text" size="small" @click="starStop(props.row)">
                            {{(props.row.status == 0)?'启用':'禁用' }}
                        </el-button>

                        <el-button type="text" size="small" @click="removeQuestion(props.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>


            <div class="subList">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-sizes="[2,3,4,5]"
                        :page-size="siziPage"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>

        </el-card>

        <questionAdd ref="questionAdd">

        </questionAdd>
    </div>
</template>

<script>

    // 引入 获取题库信息 接口
    import {apiGetQuestion, apiStarStop,apiRemoveQues} from "@/api/question";

    // 导入子组件
    import questionAdd from './component/questionAdd';

    export default {
        name: "question",
        components:{
            questionAdd
        },
        data() {
            return {

                activeRed: true,

                currentPage1: 1,
                total: 0,
                siziPage: 2,

                tableData: [],

                tempStatus: null,


                formInline: {
                    // 作者
                    username: '',
                    // 标题
                    title: '',
                    // 类型
                    type: '',
                    // 阶段
                    step: '',
                    // 状态
                    status: '',
                    // 难度
                    difficulty: '',
                    // 创建日期
                    create_date: '',
                    // 学科id
                    subject: '',
                    // 企业id
                    enterprise: ''
                },

            }
        },
        methods: {
            questioinEdit(row){
            //    编辑试题
                console.log(row.id);

                console.log(row);
                this.$refs.questionAdd.dialogFormVisible = true;
                this.$refs.questionAdd.isEdit = true;


                this.$nextTick(() =>{
                    // this.$refs.questionAdd.form.video = process.env.VUE_APP_BASEURL + '/';
                    this.$refs.questionAdd.form = JSON.parse(JSON.stringify(row));
                });

            },
            addQuestion(){
            //  新增 试题
                this.$refs.questionAdd.dialogFormVisible = true;
                this.$refs.questionAdd.isEdit = false;

                this.$nextTick(() =>{
                    this.$refs.questionAdd.$refs.form.resetFields();
                });
            },
            handleSizeChange(sizePage) {
                // 这个是选择每页显示多少条的点击事件

                // 点击后，把用户选择每页显示多少条的数据
                // 赋值给默认每页显示 10 的变量
                // 然后重新请求 当前页显示的 数据
                this.siziPage = sizePage;

                this.getQuestion(this.page, this.siziPage);

            },
            handleCurrentChange(page) {

                this.currentPage1 = page;
                // 这个点击事件是 点击第几页的
                // 所以需要加上一个点击时，请求每页具体多少条
                // 数据的 this.siziPage
                this.getQuestion(page, this.siziPage);

                console.log(`每页 ${this.siziPage} 条`);
                console.log(`当前页:  ${this.currentPage1} 页`);
                console.log(`当前选择第 ${page} 页`);

            },
            removeQuestion(row) {
                // //    删除 试题
                console.log(row.id);
                if(this.tableData.length == 1 && this.currentPage1 != 1){
                    this.currentPage1--;
                }
                apiRemoveQues(row.id).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        // 删除成功后，刷新当前页
                        this.$message.success('删除成功!');
                        this.getQuestion(this.currentPage1, this.siziPage);
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            clearForm() {
                console.log('清空表单');
                //    清空表单
                this.$refs.formInline.resetFields();
                // this.formInline.subject = '';
                //回到第一页
                //重新加载数据
                this.getQuestion();
                this.total = 1;

            },
            onSubmit() {
                //  搜索 表单
                console.log('dd');
                //回到第一页
                this.total = 1;
                // 加载搜索内容
                this.getQuestion()
            },
            starStop(row) {
                //    改变 试题 状态
                console.log(row.id, row.status);

                apiStarStop(row.id, row.status)
                    .then(res => {
                        console.log(res);

                        if (res.data.code == 200) {
                            //    修改成功,刷新页面,弹框
                            this.getQuestion(this.currentPage1, this.siziPage);
                            if (this.tempStatus == 0) {
                                this.$message.error('禁用成功!');
                            } else {
                                this.$message.success('启用成功!');
                            }
                        } else {
                            this.$message.error('修改失败!');
                        }
                    }).catch(err => {

                    console.log('修改错误:' + err);

                });


            },
            // 获取 题库 列表 信息的 方法
            getQuestion(page = 1, siziPage = 2) {
                apiGetQuestion({
                    page: page,
                    limit: siziPage,
                    ...this.formInline,
                }).then(res => {

                    this.tableData = res.data.data.items;

                    this.total = res.data.data.pagination.total;

                    console.log(this.tableData);
                    console.log(res);


                }).catch(err => {
                    console.log(err);
                })
            }
        }, created() {
            //    页面加载完毕后，加载数据
            this.getQuestion();

            console.log('dd');
        }
    }
</script>

<style lang="less">


    /*.el-input__inner {*/
        /*width: 150px;*/
    /*}*/
</style>


