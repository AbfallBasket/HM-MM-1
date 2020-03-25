<template>
    <div class="myTable">


        <!-- 搜索 框 内容-->
        <el-card class="myForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="searForm" size="small">

                <el-form-item label="学科">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择学科">
                        <el-option label="启用" value="3"></el-option>
                        <el-option label="禁用" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="阶段">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择阶段">
                        <el-option label="初级" value="1"></el-option>
                        <el-option label="中级" value="2"></el-option>
                        <el-option label="高级" value="3"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="企业">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择企业">
                        <el-option label="启用" value="3"></el-option>
                        <el-option label="禁用" value="4"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="题型">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择题型">
                        <el-option label="单选" value="1"></el-option>
                        <el-option label="多选" value="2"></el-option>
                        <el-option label="简答" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="难度">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择题型">
                        <el-option label="简单" value="1"></el-option>
                        <el-option label="一般" value="2"></el-option>
                        <el-option label="困难" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="作者">
                    <el-input style="width:150px;" v-model="formInline.email">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select style="width:150px;" class="normal" v-model="formInline.role_id" placeholder="请选择状态">
                        <el-option label="启用" value="3"></el-option>
                        <el-option label="禁用" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="日期">
                    <el-input style="width:150px;" v-model="formInline.email">
                    </el-input>
                </el-form-item>

                <el-form-item label="标题">
                    <el-input style="width:388px;" v-model="formInline.email">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clearForm">清空</el-button>
                </el-form-item>

                <el-form-item>

                    <el-button type="primary">
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

                <el-table-column
                        prop="remark"
                        label="题目">
                </el-table-column>

                <el-table-column
                        label="学科.阶段">
                    <template slot-scope="props">
                        <span>{{props.row.subject}}.{{props.row.step}}</span>
                        <span></span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="type"
                        label="题型">
                </el-table-column>

                <el-table-column
                        prop="enterprise"
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
                        prop="remark"
                        label="访问量">
                </el-table-column>


                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="props">
                        <el-button type="text" size="small">编辑</el-button>

                        <el-button type="text" size="small" @click="starStop(props.row.id,props.row.status)">
                            {{(props.row.status == 0)?'启用':'禁用' }}
                        </el-button>

                        <el-button type="text" size="small" @click="removeQuestion(props.row.id)">删除</el-button>
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

    </div>
</template>

<script>

    import {apiGetQuestion} from "@/api/question";

    export default {
        name: "question",
        data() {
            return {

                currentPage1: 1,
                total: 0,
                siziPage: 3,

                tableData: [],

                formInline: {
                    // 邮箱
                    email: '',
                    // 状态
                    role_id: '',
                    // 用户名称
                    username: '',
                    subject: '',
                },

            }
        },
        methods: {


            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // removeQuestion(){
            // //    删除 试题
            //
            // },

            clearForm() {
                //    清空表单
                console.log('dd');

            },
            onSubmit() {
                console.log('dd');

            },
            starStop() {
                //    改变 试题 状态

                console.log('dd');
            },

            getQuestion(page = 1, siziPage = 3) {
                apiGetQuestion({
                    page: page,
                    limit: siziPage,
                    ...this.formInline,
                }).then(res => {

                    this.tableData = res.data.data.items;

                    this.total = res.data.data.pagination.total;

                    console.log(res);


                }).catch(err => {
                    console.log(err);
                })
            }
        }, created() {
            //    页面加载完毕后，加载数据

            console.log('dd');

            this.getQuestion();

        }
    }
</script>

<style scoped>
    .el-input__inner {
        width: 150px;
    }
</style>


