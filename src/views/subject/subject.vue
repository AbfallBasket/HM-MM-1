<template>
    <div class="myTable">


        <div class="myForm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">

                <el-form-item label="学科编号">
                    <el-input style="width:100px;height:39px;" v-model="formInline.rid">
                    </el-input>
                </el-form-item>

                <el-form-item label="学科名称">
                    <el-input v-model="formInline.name" style="width:140px;height:40px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="创建者" >
                    <el-input v-model="formInline.username" style="width:100px;height:39px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="启用" value="1">
                        </el-option>
                        <el-option label="禁用" value="0">
                        </el-option>

                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button>清除</el-button>
                </el-form-item>

                <el-form-item>

                    <el-button type="primary" @click="addSubject">
                        <i class="el-icon-plus"></i>
                        添加学科
                    </el-button>

                </el-form-item>


            </el-form>
        </div>

        <el-table
                :data="subjectList"
                style="width: 100%"
                min-width="1000px">
            <el-table-column
                    prop="user_id"
                    label="序号"
            width="80">
            </el-table-column>

            <el-table-column
                    prop="rid"
                    label="学科编号"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="short_name"
                    label="简称"
            width="120">
            </el-table-column>

            <el-table-column
                    prop="username"
                    label="创建者"
            width="120">
            </el-table-column>

            <el-table-column
                    prop="create_time"
                    label="创建日期">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态"
            width="120">
                <span>启用</span>
                <!--<span class="activeRed">禁用</span>-->
            </el-table-column>

            <el-table-column
                    label="操作">
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">禁用</el-button>
                <el-button type="text" size="small">删除</el-button>
            </el-table-column>



        </el-table>

        <div class="subList">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[10,20,30,40]"
                    :page-size="siziPage"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

        </div>

    </div>
</template>

<script>

    import {getSubject} from "@/api/index";

    export default {
        name: "subject",
        data(){
            return {
                msg:'',
                subjectList:[],
                myStatus:'',
                currentPage1: 1,
                page:[],
                total:0,
                siziPage:10,
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },methods:{
            addSubject(){
              console.log('添加学科');
            },
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(sizePage) {
                // 这个是选择每页显示多少条的点击事件

                // 点击后，把用户选择每页显示多少条的数据
                // 赋值给默认每页显示 10 的变量
                // 然后重新请求 当前页显示的 数据
                this.siziPage = sizePage;
                this.getMyTable(1,this.siziPage);

            },
            handleCurrentChange(page) {

                // 这个点击事件是 点击第几页的
                // 所以需要加上一个点击时，请求每页具体多少条
                // 数据的 this.siziPage
                this.getMyTable(page,this.siziPage);

                console.log(`每页 ${this.siziPage} 条`);
                console.log(`当前选择第 ${page} 页`);

            }
            ,getMyTable(page = 1,siziPage=10){
                getSubject({
                    page:page,
                    limit:siziPage,
                }).then(res =>{
                    this.subjectList = res.data.data.items;
                    this.page.push(res.data.data.pagination.page);
                    this.total = res.data.data.pagination.total;

                }).catch(err =>{
                    console.log(err);
                })
            }
        },created(){
        //    进入界面请求 学科列表
            this.getMyTable();

        }
    }
</script>

<style scoped lang="less">


    .myTable{
        .myForm{
            border-radius: 5px;
            background: #FFF;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;
        }

        .el-table{
            padding: 30px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            &:before{
                background-color: transparent;
            }
            .activeRed {
                color:#FF3D3D;
            }
        }
    }
    .el-pagination{
        padding: 0 30px 30px 0;
    }

    .subList{
        /*padding: 19px;*/
        border-radius: 5px;
        background: #FFF;
    }

</style>