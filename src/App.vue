<template>
    <!--导入 视图填充view-->
    <div class="app">
        <router-view>



        </router-view>

    </div>


</template>

<script>

    export default {
        name: 'App',
    }
</script>

<style lang="less">



    #nprogress .bar {

        background:green !important;

    }

    .el-dialog__header {
        padding: 0 !important;
        height: 53px;
        line-height: 53px;
        background: linear-gradient(225deg, #1396fd, #02c6fc);
    span {
        color: white;
        font-size: 18px;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #FFF !important;
    }
    .dialog__headerbtn:hover .el-dialog__close {
        color: #FFF !important;
    }
    }

    .el-textarea__inner {
        resize: none !important;
    }
    .myTable {
        width: 100%;
        .myForm {
            border-radius: 5px;
            background: #FFF;
            /*padding: 15px;*/
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 15px;

            .el-input,.el-input__inner{
                height: 38px;
            }
        }

        .el-table {
            padding: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            &:before {
                background-color: transparent;
            }
            .activeRed {
                color: #FF3D3D;
            }
        }
    }

    .el-pagination {
        /*padding: 0 30px 30px 0;*/
        /*padding: 30px;*/

    }

    .subList {
        padding: 19px;
        border-radius: 5px;
        background: #FFF;
    }

</style>
