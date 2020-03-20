<template>
    <div id="myAside">
        <el-menu
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :router="true"
        >

            <el-menu-item index="/index/chart">
                <i class="el-icon-pie-chart"></i>
                <span slot="title" @click="btn">数据概览</span>
            </el-menu-item>

            <el-menu-item index="/index/user">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
            </el-menu-item>


            <el-menu-item index="/index/question">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">题库列表</span>
            </el-menu-item>


            <el-menu-item index="/index/enterprise">
                <i class="el-icon-office-building
"></i>
                <span slot="title">企业列表</span>
            </el-menu-item>

            <el-menu-item index="/index/subject">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">学科列表</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
    export default {
        name:'myAside',
        data(){
          return{
              isCollapse: true
          }
        },
        methods: {
            btn(){
                console.log('dd');
            }
        }
    }
</script>

<style scoped lang="less">
    #myAside{
        text-align: left;
        .is-active{
            /*color: #000;*/
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }



</style>